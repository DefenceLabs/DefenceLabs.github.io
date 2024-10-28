// Source: https://www.statista.com/statistics/387861/cost-data-breach-by-industry/

const industryData = {
    healthcare: {
        name: "Healthcare",
        costPerIncident: 9770000
    },
    
    financial: {
        name: "Financial",
        costPerIncident: 6080000
    },
    
    pharmaceuticals: {
        name: "Pharmaceuticals",
        costPerIncident: 5100000
    },
    
    technology: {
        name: "Technology",
        costPerIncident: 5450000
    },
    
    energy: {
        name: "Energy",
        costPerIncident: 5290000
    },
    
    professional_services: {
        name: "Professional Services",
        costPerIncident: 5080000
    },
    
    industrial: {
        name: "Industrial",
        costPerIncident: 5560000
    },
    
    other: {
        name: "Other",
        costPerIncident: 4880000
    },
    
    research: {
        name: "Research",
        costPerIncident: 3540000
    },
    
    education: {
        name: "Education",
        costPerIncident: 3500000
    },
    
    consumer: {
        name: "Consumer",
        costPerIncident: 3910000
    },
    
    entertainment: {
        name: "Entertainment",
        costPerIncident: 4090000
    },
    
    communications: {
        name: "Communications",
        costPerIncident: 4090000
    },
    
    transportation: {
        name: "Transportation",
        costPerIncident: 4443000
    },
    
    retail: {
        name: "Retail",
        costPerIncident: 3480000
    },
    
    media: {
        name: "Media",
        costPerIncident: 3940000
    },
    
    hospitality: {
        name: "Hospitality",
        costPerIncident: 3820000
    },
    
    public_sector: {
        name: "Public Sector",
        costPerIncident: 2550000
    }
};

function calculate() {
    // Retrieve input values
    const revenue = parseFloat(document.getElementById('revenue').value);
    const currentBudget = parseFloat(document.getElementById('current-budget').value);
    const industry = document.getElementById('industry').value;
    const tolerance = document.getElementById('risk-tolerance').value;

    // Validate inputs
    if (isNaN(revenue) || isNaN(currentBudget) || !industry) {
        alert('Please enter valid values in all fields and select an industry.');
        return;
    }

    // Get industry-specific data
    const selectedIndustry = industryData[industry];
    if (!selectedIndustry) {
        alert('Selected industry data not found.');
        return;
    }
    

    const costPerIncident = selectedIndustry.costPerIncident;
    var cybersecurityBudgetPercentage = 0.05;
    const reductionRate = 0.8; // 80% effectiveness
    
    var estimatedAnnualThreats = 0.1;
    if (tolerance === "low") {
    	estimatedAnnualThreats = 0.5;
    	cybersecurityBudgetPercentage = 0.05;
    }
    else if (tolerance === "medium") {
    	estimatedAnnualThreats = 0.25;
    	cybersecurityBudgetPercentage = 0.025;
    }
    else if (tolerance === "high") {
        estimatedAnnualThreats = 0.1;
        cybersecurityBudgetPercentage = 0.01;
    }

    // Calculate Recommended Cybersecurity Budget
    const recommendedBudget = revenue * cybersecurityBudgetPercentage;

    // Calculate Potential Incident Costs without additional investment
    const potentialIncidents = estimatedAnnualThreats;
    const potentialCost = potentialIncidents * costPerIncident;

    // Estimate Reduction in Incidents due to investment
    const reducedIncidents = potentialIncidents * (1 - reductionRate);
    const savedCost = reducedIncidents * costPerIncident;

    // If recommendedBudget > currentBudget, consider additional investment
    let additionalInvestment = 0;
    if (recommendedBudget > currentBudget) {
        additionalInvestment = recommendedBudget - currentBudget;
    }

    // Calculate ROI
    let roi = 'N/A';
    if (additionalInvestment > 0) {
        roi = ((savedCost - additionalInvestment) / additionalInvestment) * 100;
        roi = `${roi.toFixed(2)}%`;
    }

    // Display Results
    document.getElementById('recommended-budget').innerText = `Recommended Cybersecurity Budget: $${recommendedBudget.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('estimated-savings').innerText = `Estimated Savings from Reduced Incidents: $${savedCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('roi-percentage').innerText = additionalInvestment > 0 ? `ROI: ${roi}` : 'ROI: N/A (No additional investment required)';
    
    // Show results section
    document.getElementById('results').style.display = 'block';
}
