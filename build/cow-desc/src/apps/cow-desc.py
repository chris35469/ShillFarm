from random import *

""" create a cow's description/backstory """

class Backstory():
    """ ORIGIN """
    imported = ["Imported", "Sourced", "Loaned", "Gifted", "Transferred", "Traded", "Dealt"]
    alien = ["Appeared on", "Teleported to", "Wandered to", "Sighted at", "Tethered to"]
    native = ["Born", "Birthed", "Took Genesis", "Christened", "Originated", "Genuine"]
    derivative = ["Cloned", "Synthesized", "Developed", "Evolved", "Invented", "Propagated", "Engendered", "Engineered"]
    afroFame = [ "Questlove", "Afro Samurai", "Angela Davis", "Bob Ross", "The Jackson 5", "Solange", "Viola Davis", "Pam Grier", "Goldmember Beyonce"]
    culture = [ 
        "Tom Sach's Rocket Ship", "Banksy's Disney Guantanamo", "Mister Brainwash's Lost Camera Footage",
        "Go Demarcus!", f"George Clinton's Dog Catcher", "Sang Juntao's Uzi", "The Real 63", "The Love Below",
        f"{choice(afroFame)}'s Afro", "Color Money", "T Pain's AutoTune Presets", "3000's Prototype",
        "Dr. Evil's Secret Lair", "The Private Collection of Clayton Bigsby", 
        "Big Perk in the Airport", "Doors Go Up On A Tesla", "Blowup Like Soo-Yung", 
        "Blue Flame Gambino", "The Next Episode of Dragon Ball Z", "Jack Stillz"
    ]
    """ RESIDING @ """
    housingStatus = [ "Currently Residing at", "Known to Frequent", "Free Roaming @", "Pinned to", "Last seen in"]
    directions = [ "North", "Northwest", "Northeast", "NorthNorth", "South", "Southeast", "Southwest", "West", "East" ]
    greenspaces = ["Meadow","Grassland","Pasture", "Sheep Walk", "Paddock", "Sward" ]
    domains = ["Domain", "Sector", "Sphere", "Matrix"]
    independence = [ "Independent", "Liberated", "Uncapitalized", "Eternally Discharged", "Emancipated", "Enfranchised", "Unbound" ]
    love = ["Love", "Affection", "Self-Love", "Doting", "Coupling", "Warmth", "Tenderness", "Desire", "Adoration"]
    garden = [ 
        f"{choice(greenspaces)} {randint(1,99)}", 
        f"{choice(greenspaces)} Bos Taurus", 
        f"{choice(['Pasture', 'Paddock'])} for the Pasteurized", 
        f"{choice(['Sheep', 'Meadow'])} Walk Going Crazy", 
        f"Moo-Moo's {choice(greenspaces)} for {choice(independence)} Love", 
        f"Greenspace {choice(domains)} for {choice(independence)} Cattle",
    ]
    """ EATING HABIT """
    time = ["Day", "Week", "Year", "Month", "Second"]
    consumption = [ "Feeds on", "Eats", "Devours", "Snacks on", "Ingests", "Gulps", 
        "Gobbles", "Chews", "Chomps", "Munches on", "Demolishes", "Grazes on", "Feasts on"]
    herbalType = ["Indica", "Hemp", "Sativa", "Hybrid", "Basil", "Cilantro", "Chamomile", "Aztec Gold", "Mugwort", "Mullein", "Lavender"]
    herbalState = ["Infused", "Cured", "Blended", "Hydrated", "Treated", "Cleansed"]
    grass = [ "Moss", "Fescue", "St. Augustine Grass", "Ryegrass", "Corn", "Lemongrass", "Pampas Grass", "Kentucky Bluegrass", "Kikuyu", "Oat", "Sweet Grass", "Beachgrass", "Barley" ]
    """ RELIEF HABIT """
    defecation = ["Poops", "Shits", "Excretes", "Discharges", "Craps", "Dumps", "Whoopsies", "Sharts"]
    timeInterval = ["Second", "Minute", "Day", "Week", "Month", "Year"]
    """ COW DAO CALL TO ACTION """
    save = ["Save", "Rescue", "Bail Out", "Salvage", "Preserve", "Safeguard", "Spare"]
    termination = ["Termination", "Slaughter", "Massacre", "Mass Consumption", "Butcher", "Destruction", "Extermination", "Defeat"]
    access = ["Access", "Entry", "Admission", "Induction", "Appointment", ]
    
    def __init__(self, nStories:int=69):
        self.nStories = nStories
        
    def origin(self):
        imported = self.imported
        culture = self.culture
        alien = self.alien
        derivative = self.derivative
        origin = [ f"{choice(imported)} to Shill Farm from {choice(culture)}", f"{choice(alien)} Shill Farm from {choice(culture)}", f"{choice(derivative)} by Shill Farm for {choice(culture)}"]
        return choice(origin)
    
    def residing(self):
        housingStatus = self.housingStatus
        greenspaces = self.greenspaces
        directions = self.directions
        garden = self.garden
        residingAt = [  f"{choice(housingStatus)} the {choice(greenspaces)} {choice(directions)} ", f"{choice(housingStatus)} {choice(garden)}"]
        return choice(residingAt)
    
    def eatingHabit(self):
        consumption = self.consumption
        herbalType = self.herbalType
        herbalState = self.herbalState
        time = self.time
        eatingHabit = [ f"{choice(consumption)} Other Cows", f"{choice(consumption)} {choice(herbalType)} {choice(herbalState)} grass", f"Is on a {randint(1,99)} {choice(time)} Mushroom Trip"]
        return choice(eatingHabit)
        
    def reliefHabit(self):
        defecation = self.defecation
        timeInterval = self.timeInterval
        reliefHabit = [ f"{choice(defecation)} Mushrooms By The {choice(timeInterval)}" ]
        return choice(reliefHabit)
    
    def call2action(self):
        save = self.save
        termination = self.termination
        access = self.access
        call2action = [
            f"{choice(save)} this Cow from {choice(termination)} and Gain {choice(access)} into the Cow DAO.",
            f"Will you {choice(save)} this Cow from {choice(termination)} for {choice(access)} into the Cow DAO?",
            f"{choice(save)} or {choice(termination)}? Your answer determines {choice(access)} into the Cow DAO.",
    ]
        return choice(call2action)
        
    def stories(self, nStories:int=69):
        stories = []
        for i in range(nStories):
            origin = self.origin()
            residing = self.residing()
            eatingHabit = self.eatingHabit()
            reliefHabit = self.reliefHabit()
            call2action = self.call2action()
            backstory = f"""{origin} and {residing}, this cow {eatingHabit} and {reliefHabit}. {call2action}"""
            stories.append(backstory)
        return stories
    
    def display(self):
        for story in self.stories():
            print(story)
            print("\n")
            
    def output(self):
        with open("../outputs/cow-stories.txt", "w+") as file:
            for story in self.stories():
                file.write(story)
                file.write("\n\n")
    
    