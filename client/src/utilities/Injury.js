class Injury {
  static successRate = 0.85;

  static get types() {
    return {
      BURN: 'Burn',
      CUT: 'Cut',
    };
  }

  static getConfidenceStatus(rate) {
    if (rate >= 0.85) return "High";
    if (rate >=0.75) return "Moderate";
    return "Low - Please try another picture";
  };

  static getInstructions(type) {
    switch (type) {
      case Injury.types.BURN:
        return "Cool the burn with running water, cover with a sterile bandage, and avoid popping blisters.";
      case Injury.types.CUT:
        return "Clean the cut with water, apply pressure to stop bleeding, and cover with a sterile bandage.";
      default:
        return "Unknown injury type. Please consult a medical professional.";
    }
  }
}

export default Injury;