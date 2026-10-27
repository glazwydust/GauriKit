"""
=============================================================================
GAURIKIT COGNITIVE BRAIN & ADAPTIVE LEARNING ENGINE (Python)
=============================================================================
This module acts as the analytical and cognitive modeling engine for GauriKit 2.0.

Core Architectural Separation:
  1. RAW OBSERVED PERFORMANCE:
     - Baseline Pre-Assessment Score (%)
     - Transfer Post-Assessment Score (%)
     - Observed Change (Δ in percentage points: Post % - Pre %)
     
  2. LATENT COGNITIVE MODEL (Bayesian Knowledge Tracing - BKT):
     - Prior P(L0): Initial belief of student skill presence
     - Learning Transition P(T): Learning gain per intervention
     - Guess P(G) and Slip P(S): Behavioral noise parameters
     - Response Latency Modifier: Penalizes rapid guessing (<2s), rewards deliberation (3s-12s)

  3. EXPORT INGESTION:
     - Can parse exported `GauriKit_Empirical_Dataset_*.json` files.
=============================================================================
"""

import json
import math
import os
import sys
import time
from typing import Dict, List, Any, Optional

# Ensure UTF-8 output on Windows terminals
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


class BayesianSkillTracker:
    """
    Tracks a single cognitive skill dimension using Bayesian Knowledge Tracing (BKT).
    
    Parameters:
      - p_init (P(L0)): Initial prior probability of skill mastery.
      - p_learn (P(T)): Probability of learning the skill from guided reflection.
      - p_guess (P(G)): Probability of guessing correctly without understanding.
      - p_slip  (P(S)): Probability of knowing the skill but making an accidental mistake.
    """
    def __init__(self, skill_name: str, p_init=0.25, p_learn=0.35, p_guess=0.20, p_slip=0.10):
        self.skill_name = skill_name
        self.p_known = p_init
        self.p_learn = p_learn
        self.p_guess = p_guess
        self.p_slip = p_slip
        self.history = [self.p_known]

    def update(self, is_safe_choice: bool, response_time_sec: float = 4.0) -> float:
        """
        Updates the latent mastery probability after observing a decision.
        Incorporates response latency:
          - Fast response (< 2.0s): potential impulsive click / lucky guess.
          - Deliberate response (3.0s - 12.0s): thoughtful critical evaluation.
        """
        # Latency weighting factor
        if response_time_sec < 2.0:
            time_modifier = 0.75  # Impulsive penalty
        elif 3.0 <= response_time_sec <= 12.0:
            time_modifier = 1.15  # Thoughtful bonus
        else:
            time_modifier = 1.00  # Neutral

        # Step 1: Bayes' Rule update for current evidence
        if is_safe_choice:
            # P(L | Correct) = [P(L) * (1 - P(S))] / [P(L)*(1 - P(S)) + (1 - P(L))*P(G)]
            numerator = self.p_known * (1 - self.p_slip)
            denominator = numerator + ((1 - self.p_known) * self.p_guess)
        else:
            # P(L | Incorrect) = [P(L) * P(S)] / [P(L)*P(S) + (1 - P(L))*(1 - P(G))]
            numerator = self.p_known * self.p_slip
            denominator = numerator + ((1 - self.p_known) * (1 - self.p_slip))

        if denominator == 0:
            p_posterior = self.p_known
        else:
            p_posterior = numerator / denominator

        # Step 2: Transition / Learning Update
        # P(L_t) = P(Posterior) + (1 - P(Posterior)) * P(Transit) * time_modifier
        learned_transition = (1 - p_posterior) * self.p_learn * time_modifier
        self.p_known = p_posterior + learned_transition

        # Constrain probability between 1% and 99%
        self.p_known = max(0.01, min(0.99, self.p_known))
        self.history.append(self.p_known)
        
        return round(self.p_known * 100, 1)


class StudentBrain:
    """
    Cognitive Modeling & Telemetry Engine for GauriKit Participants.
    Manages all 6 core cognitive safety dimensions:
      1. risk_recognition
      2. verification
      3. help_seeking
      4. boundary_setting
      5. impulse_control
      6. problem_solving
    """
    SKILLS = [
        "risk_recognition",
        "verification",
        "help_seeking",
        "boundary_setting",
        "impulse_control",
        "problem_solving"
    ]

    def __init__(self, student_id: str, age_group: str = "6-8", institution: str = "Fellowship Pilot School"):
        self.student_id = student_id
        self.age_group = age_group
        self.institution = institution
        self.start_time = time.time()
        
        # Bayesian trackers for latent mastery modeling
        self.trackers: Dict[str, BayesianSkillTracker] = {
            skill: BayesianSkillTracker(skill) for skill in self.SKILLS
        }
        
        # Observed response records
        self.pre_responses: List[Dict[str, Any]] = []
        self.learning_responses: List[Dict[str, Any]] = []
        self.post_responses: List[Dict[str, Any]] = []

    def record_pre_response(self, question_id: str, is_safe: bool, skills_tested: Dict[str, int], time_sec: float = 4.0):
        """Records an observed pre-assessment response."""
        self.pre_responses.append({
            "question_id": question_id,
            "is_safe": is_safe,
            "skills_tested": skills_tested,
            "time_sec": time_sec
        })

    def record_learning_decision(self, scenario_id: str, choice_id: str, is_safe: bool, skills_tested: Dict[str, int], time_sec: float = 4.0):
        """Processes an interactive in-game decision and updates the Bayesian trackers."""
        entry = {
            "scenario_id": scenario_id,
            "choice_id": choice_id,
            "is_safe": is_safe,
            "skills_tested": skills_tested,
            "time_sec": time_sec,
            "bkt_updates": {}
        }

        # Update relevant BKT trackers
        for skill_key, weight in skills_tested.items():
            if weight > 0 and skill_key in self.trackers:
                mastery = self.trackers[skill_key].update(is_safe, time_sec)
                entry["bkt_updates"][skill_key] = mastery

        self.learning_responses.append(entry)
        return entry

    def record_post_response(self, question_id: str, is_safe: bool, skills_tested: Dict[str, int], time_sec: float = 4.0):
        """Records an observed post-assessment transfer response."""
        self.post_responses.append({
            "question_id": question_id,
            "is_safe": is_safe,
            "skills_tested": skills_tested,
            "time_sec": time_sec
        })

    def get_observed_metrics(self) -> Dict[str, Any]:
        """Computes pure empirical metrics without mathematical transformations."""
        n_pre = len(self.pre_responses)
        safe_pre = sum(1 for r in self.pre_responses if r["is_safe"])
        pre_pct = round((safe_pre / n_pre) * 100, 1) if n_pre > 0 else 0.0

        n_post = len(self.post_responses)
        safe_post = sum(1 for r in self.post_responses if r["is_safe"])
        post_pct = round((safe_post / n_post) * 100, 1) if n_post > 0 else 0.0

        delta_pts = round(post_pct - pre_pct, 1)

        # Skill-wise breakdown
        skill_breakdown = {}
        for skill in self.SKILLS:
            # Pre
            pre_tested = [r for r in self.pre_responses if r["skills_tested"].get(skill, 0) > 0]
            pre_safe = [r for r in pre_tested if r["is_safe"]]
            pre_skill_pct = round((len(pre_safe) / len(pre_tested)) * 100, 1) if pre_tested else 0.0

            # Post
            post_tested = [r for r in self.post_responses if r["skills_tested"].get(skill, 0) > 0]
            post_safe = [r for r in post_tested if r["is_safe"]]
            post_skill_pct = round((len(post_safe) / len(post_tested)) * 100, 1) if post_tested else 0.0

            skill_breakdown[skill] = {
                "observed_pre_pct": pre_skill_pct,
                "observed_post_pct": post_skill_pct,
                "observed_delta_points": round(post_skill_pct - pre_skill_pct, 1),
                "latent_bkt_mastery_pct": round(self.trackers[skill].p_known * 100, 1)
            }

        return {
            "participant_id": self.student_id,
            "institution": self.institution,
            "age_group": self.age_group,
            "observed_pre_score_pct": pre_pct,
            "observed_post_score_pct": post_pct,
            "observed_change_percentage_points": delta_pts,
            "skill_metrics": skill_breakdown
        }

    def generate_research_report(self) -> str:
        """Generates a structured research evaluation summary."""
        metrics = self.get_observed_metrics()
        
        report = []
        report.append("=" * 78)
        report.append(f" GAURIKIT 2.0 EMPIRICAL RESEARCH REPORT — PARTICIPANT: {self.student_id}")
        report.append("=" * 78)
        report.append(f"Institution: {self.institution} | Age Cohort: {self.age_group} yrs")
        report.append(f"Observed Baseline Pre-Score : {metrics['observed_pre_score_pct']}%")
        report.append(f"Observed Transfer Post-Score: {metrics['observed_post_score_pct']}%")
        sign = "+" if metrics['observed_change_percentage_points'] >= 0 else ""
        report.append(f"Observed Net Change (Δ)     : {sign}{metrics['observed_change_percentage_points']} percentage points")
        report.append("-" * 78)
        report.append(f"{'SKILL DIMENSION':<22} | {'PRE-TEST':<9} | {'POST-TEST':<9} | {'CHANGE (Δ)':<11} | {'BKT P(L)':<9}")
        report.append("-" * 78)

        for skill, data in metrics["skill_metrics"].items():
            pre_str = f"{data['observed_pre_pct']:.1f}%"
            post_str = f"{data['observed_post_pct']:.1f}%"
            d = data['observed_delta_points']
            d_str = f"+{d:.1f} pts" if d >= 0 else f"{d:.1f} pts"
            bkt_str = f"{data['latent_bkt_mastery_pct']:.1f}%"
            name = skill.replace('_', ' ').title()
            report.append(f"{name:<22} | {pre_str:>9} | {post_str:>9} | {d_str:>11} | {bkt_str:>9}")

        report.append("=" * 78)
        return "\n".join(report)


def analyze_gaurikit_export(json_filepath: str) -> Optional[Dict[str, Any]]:
    """
    Parses and verifies a JSON file exported from GauriKit 2.0.
    """
    if not os.path.exists(json_filepath):
        print(f"File not found: {json_filepath}")
        return None

    with open(json_filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    sessions = data.get("sessions_data", [])
    print(f"\n📊 Loaded {len(sessions)} session(s) from {json_filepath}:")
    
    for i, s in enumerate(sessions, 1):
        print(f"\n  [{i}] ID: {s.get('participant_id')} | Mode: {s.get('mode')} | Age: {s.get('age_group')}")
        print(f"      Pre Score : {s.get('pre_score_pct')}%")
        print(f"      Post Score: {s.get('post_score_pct')}%")
        delta = s.get('delta_pct_points', 0)
        sign = "+" if delta >= 0 else ""
        print(f"      Observed Change (Δ): {sign}{delta} percentage points")
    
    return data


# =============================================================================
# STANDALONE VERIFICATION & SIMULATION
# =============================================================================
if __name__ == "__main__":
    print("\n🧠 RUNNING GAURIKIT 2.0 EMPIRICAL ENGINE VALIDATION...\n")
    
    # Simulate a child: "Aarav" (Age 7) with known dataset (Pre=50%, Post=75%, Change=+25 pts)
    child = StudentBrain(student_id="C-AARAV-07", age_group="6-8", institution="Greenwood Primary")
    
    # 4 Pre-Assessment Questions (2 correct, 2 incorrect -> 50%)
    all_skills = {s: 1 for s in StudentBrain.SKILLS}
    child.record_pre_response("pre_1", is_safe=True, skills_tested=all_skills, time_sec=4.2)
    child.record_pre_response("pre_2", is_safe=False, skills_tested=all_skills, time_sec=1.8)
    child.record_pre_response("pre_3", is_safe=True, skills_tested=all_skills, time_sec=5.1)
    child.record_pre_response("pre_4", is_safe=False, skills_tested=all_skills, time_sec=1.5)
    
    # In-Game Learning Scenarios with Guided Feedback
    child.record_learning_decision("learn_1", "l1_c2", is_safe=True, skills_tested=all_skills, time_sec=4.5)
    child.record_learning_decision("learn_2", "l2_c3", is_safe=True, skills_tested=all_skills, time_sec=5.0)
    child.record_learning_decision("learn_3", "l3_c2", is_safe=True, skills_tested=all_skills, time_sec=4.8)
    child.record_learning_decision("learn_4", "l4_c2", is_safe=True, skills_tested=all_skills, time_sec=6.1)
    
    # 4 Post-Assessment Transfer Questions (3 correct, 1 incorrect -> 75%)
    child.record_post_response("post_1", is_safe=True, skills_tested=all_skills, time_sec=4.0)
    child.record_post_response("post_2", is_safe=True, skills_tested=all_skills, time_sec=4.8)
    child.record_post_response("post_3", is_safe=True, skills_tested=all_skills, time_sec=5.5)
    child.record_post_response("post_4", is_safe=False, skills_tested=all_skills, time_sec=2.2)
    
    # Output verified research report
    print(child.generate_research_report())
    
    metrics = child.get_observed_metrics()
    assert metrics["observed_pre_score_pct"] == 50.0, f"Expected 50.0, got {metrics['observed_pre_score_pct']}"
    assert metrics["observed_post_score_pct"] == 75.0, f"Expected 75.0, got {metrics['observed_post_score_pct']}"
    assert metrics["observed_change_percentage_points"] == 25.0, f"Expected 25.0, got {metrics['observed_change_percentage_points']}"
    print("\n✅ Verification Successful: Raw Observed Metrics (Pre=50%, Post=75% -> Change=+25 pts) validated without fake fallbacks.")
