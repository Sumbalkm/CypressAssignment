class mainPage {


    gotToWays() {
    
        //cy.contains('Round-trip').click()
        cy.get('.form-section.noBg>div>div>div:nth-child(1)>div:nth-child(1)>div').click()
        cy.get('[style] div[id$="-switch-list-wrapper"]>ul>li[data-title="One-way"] ')
         .contains('One-way').click({ force: true })   //[id$="switch-option-3"] 
        cy.get('.form-section.noBg>div>div>div:nth-child(1)>div:nth-child(2)>div').click()
        cy.get('[style] div[id$="-travelersAboveForm-adults"]>div>div>button[title="Increment"]').click()
        cy.get('.title-section').click()
        //cy.get('section[class*="form-section noBg"]').click()
        //cy.get('div[class*="Base-Search-SearchForm"]>div[class*="keel-grid"]').click()
        cy.get('.form-section.noBg>div>div>div:nth-child(1)>div:nth-child(3)>div').click()   
        cy.get('[style] div[id$="-cabinType-widget-list-wrapper"]>ul>li[data-title="First"] ')
        .contains('First').click({ force: true }) 
        cy.get('.form-section.noBg>div>div>div:nth-child(1)>div:nth-child(4)>div').click()
        cy.get('[style] div[id$="-baggage-carry-on"]>div>div>button[title="Increment"]').click()
        cy.get('[style] div[id$="-baggage-checked-bag"]>div>div>button[title="Increment"]').dblclick()
        //cy.get('section[class*="form-section noBg"]').click()
        cy.get('.title-section').click()
        //cy.get('div[class*="Base-Search-SearchForm"]>div[class*="keel-grid"]').click()
    }    
    goToSearchInput(Origin,OriSelection,Destination,DesSelection,Depart) {

        // --------- FROM? --------------
        cy.get('.search-form-inner>div>div>div>div>div>div>div[id$="-origin-input-wrapper"]>div>div>div>div:nth-child(2)')
        .click()
        cy.get('div[id$="-origin-airport-smarty-wrapper"]>div:nth-child(3)>input[placeholder="From?"]')
        .type(Origin)
       cy.get('div[id$="-origin-airport-smarty-content"]>div>ul>li:nth-child(1)>div:nth-child(3)>.multiAirportCheckbox__code')
       .invoke('text').then(($text) => {
        expect($text).to.eq(OriSelection)
        })
       // cy.get('div[id$="-origin-airport-smarty-content"]>div>ul>li:nth-child(1)>div:nth-child(3)>.multiAirportCheckbox__checkbox').click()
    
        cy.get('div[id$="-origin-airport-smarty-content"]>div>ul>li:nth-child(1)>div:nth-child(3)>.multiAirportCheckbox__checkbox>input[type="checkbox"]')
        .check({ force: true})

        // ------------ TO? --------------

        cy.get('div[id$="-destination-input-wrapper"]>div[data-placeholder="To?"]>div[id$="-destination-airport-display-inner"]')
       .click()
       cy.get('div[id$="-destination-airport-textInputWrapper"]>input[placeholder="To?"]')
        .type(Destination)
        cy.get('div[id$="-destination-airport-smarty-content"]>div>ul>li:nth-child(1)>div:nth-child(3)>.multiAirportCheckbox__code')
       .invoke('text').then(($text) => {
        expect($text).to.eq(DesSelection)
        })
        cy.get('div[id$="-destination-airport-smarty-content"]>div>ul>li:nth-child(1)>div:nth-child(3)>.multiAirportCheckbox__checkbox>input[type="checkbox')
        .check({ force: true})

        // ---------- Date Picker ---------------

       cy.get('.search-form-inner>div>div:nth-child(1)>div:nth-child(1)>div:nth-child(4)>div:nth-child(1)>div:nth-child(1)>div>div>div[data-placeholder="Depart"]').click()
        .click({ force: true})
        cy.get('div[id$="-depart-input"]').clear().type(Depart, {force: true})



        // ---------- Invoke Selection Text ---------

        let flight, travs, cabin, bags , depart , arrive, startdate
        cy.get('.form-section.noBg>div>div>div:nth-child(1)>div:nth-child(1)>div>div>div>div').then(($text) => {
            flight = $text.text()
        })
        cy.get('.form-section.noBg>div>div>div:nth-child(1)>div:nth-child(2)>div>button>div>div:nth-child(1)').then(($text) => {
            travs = $text.text()
        })
        cy.get('.form-section.noBg>div>div>div:nth-child(1)>div:nth-child(3)>div>div>div>div').then(($text) => {
            cabin = $text.text()
        })
        cy.get('.form-section.noBg>div>div>div:nth-child(1)>div:nth-child(4)>div>button>div>div:nth-child(1)').then(($text) => {
            bags = $text.text()
        })
       cy.get('.search-form-inner>div>div>div>div>div>div>div[id$="-origin-input-wrapper"]>div>div>div>div:nth-child(1)>div:nth-child(2)')
        .then(($text) => {
            depart = $text.text()
        })
       cy.get('.search-form-inner>div>div>div>div:nth-child(3)>div>div>div>div>div>div>div:nth-child(2)').then(($text) => {
            arrive = $text.text()
        })
        cy.get('.search-form-inner>div>div:nth-child(1)>div:nth-child(1)>div:nth-child(4)>div:nth-child(1)>div:nth-child(1)>div>div>div[data-placeholder="Depart"]')
        .then(($text) => {
            startdate = $text.text()
        })
        

     

        // ------------- Search Flight ------------
        
        cy.get('button[id$="-submit"][title="Search flights"][type="submit"]').click({force: true})



        // ------------ Verify Selection Text -------------

        cy.get('div[id$="-switch-display"]>div').should(($text2) => {
            expect($text2.text()).to.eq(flight)
        })
        cy.get('.travelersAboveForm>div>button>div>div:nth-child(1)').should(($text2) => {
            expect($text2.text()).to.eq(travs)
        })
        cy.get('div[class*="cabinAboveForm"]>div>div>div:nth-child(1)>div').should(($text2) => {
            expect($text2.text()).to.eq(cabin)
        })
        cy.get('div[id$="-baggageDropdownContainer"]>div>button>div>div:nth-child(1)').should(($text2) => {
            expect($text2.text()).to.eq(bags)
        })
       cy.get('div[id$="-origin-input-wrapper"]>div>div>div>div>div:nth-child(2)').should(($text2) => {
            expect($text2.text()).to.eq(depart)
        })
        cy.get('div[id$="-destination-input-wrapper"]>div>div>div>div>div:nth-child(2)').should(($text2) => {
            expect($text2.text()).to.eq(arrive)
        })
        cy.get('div[id$="-dateRangeInput-display-start"]>div>div>div:nth-child(1)').should(($text2) => {
            expect($text2.text()).to.eq(startdate)
        })
       
    }


    goToSorting() {
       
        cy.get('div[id$="-tabs"]>a[data-sort="price_a"]>div>div>div>div>div>span>span').should(($sort) => {
            expect($sort.text()).contains('Cheapest')
        })
       cy.get('div[id$="-tabs"]>a:nth-child(2)>div>div>div>div>div>span>span:nth-child(1)').should(($sort) => {
            expect($sort.text()).contains('Best')
        })
        
        cy.get('div[id$="-tabs"]>a:nth-child(3)>div>div>div>div>div>span>span').should(($sort) => {
            expect($sort.text()).contains('Quickest')
        })
        
    }
  


    getCheapPrice() {
        return cy.get('div[id$="-tabs"]>a[data-sort="price_a"]>div>div>div>div:nth-child(2)>span:nth-child(1)')
    
    }

    getBestPrice() {
        return cy.get('div[id$="-tabs"]>a[data-sort="bestflight_a"]>div>div>div>div:nth-child(2)>span:nth-child(1)')
    }

    getQuickPrice() { 
        return cy.get('div[id$="-tabs"]>a[data-sort="duration_a"]>div>div>div>div:nth-child(2)>span:nth-child(1)')
    }

    getCheapTime(){
        return cy.get('div[id$="-tabs"]>a[data-sort="price_a"]>div>div>div>div:nth-child(2)>span:nth-child(2)')
    }

    getBestTime(){
        return cy.get('div[id$="-tabs"]>a[data-sort="bestflight_a"]>div>div>div>div:nth-child(2)>span:nth-child(2)')
    }

    getQuickTime(){
        return cy.get('div[id$="-tabs"]>a[data-sort="duration_a"]>div>div>div>div:nth-child(2)>span:nth-child(2)')
    }

}

export default new mainPage