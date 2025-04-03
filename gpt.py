token="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"
"""Run this model in Python

pip install azure-ai-inference
"""
context = """
### CONTEXTE ENTREPRISE ###
Générez le maximum possible des recommandations techniques pertinentes
reliée à la valeur de chaque paramètre ci-dessous 
non connues par l'entreprise ou l'utilisateur normal EN ANGLAIS
et seulement pour les paramètres qui ont des valeurs
un peu élevées ou très élevées par rapport aux normes
et afficher le paramètre d'une facon plus lisible et claire
que l'exemple donné ci-dessous
Format EXIGÉ est spécifié par les deux exemples ci dessous
### RÈGLES ABSOLUES ###
1. Uniquement des chaînes de caractères
2. Format des pourcentages : -12% (pas de 0,12 ou .12)
3. Pas de nombres isolés
4. Pas de sous-tableaux

### DONNÉES ###
##GÉNÉRAL ##
-country: "UK",
-activitySector: "Agriculture",
-numberOfFullTimeEmployees: 1250,
-percentageOfTelework: 60.21217065823487,
## Énergie ##
- annualConsumptionOfElectricity: 191023.76660150266
- annualConsumptionOfNaturalGas: 272012.08128735784
- annualConsumptionOfPropane: 149117.27041829418
- annualConsumptionOfFuel: 197758.50940558742
- annualConsumptionOfCoal: 5784.5785263095895
- annualConsumptionOfRefrigerant: 85.22568417974996
- annualConsumptionOfGPL: 77216.37419899805
## Bureautique ##
- expensesOfPaper: 96369.05884091025
- expensesOfSmallOfficeSupplies: 30429.017376968335
- builtAreaOfCompany: 99394.28849463518
## Logistique ##
- tonsOfAirFreightLt3000: 8919.695735523528
- tonsOfAirFreightGt3000: 13253.107944099682
- tonsOfSeaFreightLt3000: 43337.679082014394
- tonsOfSeaFreightGt3000: 68229.68535072295
## IT ##
- numberOfDesktopComputers: 4425
- numberOfLaptops: 1779
- numberOfIndividualPrinters: 427
- numberOfServers: 59
- numberOfMultifunctionPrinters: 400
- numberOfFlatPanelScreens: 1876
## Mobilité ##
- numberOfShortHaulRoundTrip: 30
- numberOfMediumHaulRoundTrip: 207
- numberOfLongHaulRoundTrip: 193
## Transport ##
- fuelConsumptionOfGasoline: 121916.21896179621
- fuelConsumptionOfDiesel: 247824.2215755103
- consumptionOfLPG: 154702.25205097202
- numberOfLightDutyVehicles: 176
- numberOfCommercialVehicles: 85
- numberOfHeavyVehicles: 91
### EXEMPLES VALIDES ###
[
    {
        'parameter': 'Annual Consumption Of Electricity',
        'interpretation':'You have a high fuel consumption index  and it causes a 10% of your carbon footprint',
        'objective':'Diminish your fuel consumption by 5%'
    },{
        'parameter': 'Number Of Light Duty Vehicles',
        'interpretation':'Réduction flotte véhicules',
        'objective':'Reduce your vehicules to 150 vehicules in the incoming period'
    }
]

### SANCTIONS ###
Toute réponse non conforme sera rejetée automatiquement
"""
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage
from azure.ai.inference.models import UserMessage
from azure.core.credentials import AzureKeyCredential

client = ChatCompletionsClient(
    endpoint="https://models.inference.ai.azure.com",
    credential=AzureKeyCredential(token),
)

response = client.complete(
    messages=[
        SystemMessage("""
                      Vous êtes un assistant d’analyse de données spécialisé dans la génération de prédictions précises et détaillées. Votre tâche est de fournir des prédictions claires en respectant le format demandé, sans ajouter de texte superflu ou d'explications hors sujet.
                      """),
        UserMessage(context),
    ],
    model="gpt-4o-mini",
    temperature=0.74,
    max_tokens=4096,
    top_p=1
)

print(response.choices[0].message.content)
