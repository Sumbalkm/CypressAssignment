import main_page from '../pages/main_page'
import time_fare from '../helpers/time_fare'


describe('Search Tests', () => {
    before(()=> {
        cy.visit('/')
    })

    it('lets the user search flights from the application', () => {
       
        main_page.gotToWays()     
       
      
        cy.fixture('searchcriteria').then(($origin) => {

           main_page.goToSearchInput($origin.Scenario_1.Origin_Input,$origin.Scenario_1.Origin_Selection,
               $origin.Scenario_1.Destination_Input, $origin.Scenario_1.Destination_Selection,
               $origin.Scenario_1.Departure)

              //  main_page.goToSearchInput($origin.Scenario_2.Origin_Input,$origin.Scenario_2.Origin_Selection,
              //   $origin.Scenario_2.Destination_Input, $origin.Scenario_2.Destination_Selection,
              //   $origin.Scenario_2.Departure)
        }) 

     
      main_page.goToSorting()



       
    //// get best fare


 
  let Best = '', bTime= '' , bTime1 = '' 
    cy.server()
    cy.route({
        method: 'GET',
        url: '**?sort=bestflight_a**',
      }).as('searchDataB')
      cy.wait(10000)
      main_page.getBestPrice()
      .then ((number)=> {
        Best = parseFloat( number
          .text()
          .split('$')
          .pop())
      })

      main_page.getBestTime()
      .then ((time)=> {
       bTime1 = time.text()
       bTime = time_fare.timeFareCalc(bTime1)
      })
      

      cy.wait('@searchDataB').then((xhr) => {
        main_page.getBestPrice()
        .should('contain', Best)

        cy.log(Best)
        cy.log(bTime)
    })
    cy.log(Best)


         /// get cheapest fare

         cy.wait(10000)
         main_page.getCheapPrice().click({force: true})

         let Cheap = '' , cTime = '' , cTime1 = '' 
        
         
         cy.server()
         cy.route({
             method: 'GET',
             url: '**?sort=price_a**',
           }).as('searchDataC')
           main_page.getCheapPrice()
           .then((number) => {
             Cheap = parseFloat( number
               .text()
               .split('$')
               .pop())
           })
 
           main_page.getCheapTime()
           .then ((time)=> {

             cTime1 =time.text()
            cTime = time_fare.timeFareCalc(cTime1)
               
           })

           cy.wait('@searchDataC').then((xhr) => {
             main_page.getCheapPrice()
             .should('contain', Cheap)
             cy.log(Cheap)
             cy.log(cTime)
         }) 

         /// get quickest fare

         cy.wait(10000)
         main_page.getQuickPrice().click({force: true})
         
         let Quick = '', qTime = '', qTime1 = ''
        
         
         cy.server()
         cy.route({
             method: 'GET',
             url: '**?sort=duration_a**',
           }).as('searchDataQ')
           main_page.getQuickPrice()
           .then((number) => {
             Quick = parseFloat( number
               .text()
               .split('$')
               .pop())
           })
         
           main_page.getQuickTime()
           .then ((time)=> {
            qTime1 = time.text()
            qTime = time_fare.timeFareCalc(qTime1)
               
           })

           cy.wait('@searchDataQ').then((xhr) => {
             main_page.getQuickPrice()
             .should('contain', Quick)
             cy.log(Quick)
             cy.log(qTime)
             
           
         })
    


         main_page.getQuickPrice()
           .then(() => {
             if(Cheap <= Best && Cheap <= Quick){
              cy.log('Cheap fare is less than from Best and Quick fares')
              cy.log('Cheapest:',Cheap)
              cy.log('Best:',Best) 
              cy.log('Quickest:',Quick)
              // Compares Cheap fare with Best fare
              if(Cheap< Best){
                expect(Cheap).to.be.lessThan(Best)
              }
              else{
                if(Cheap == Best){
                  expect(Cheap).to.be.equal(Best)
                }
                else{
                  cy.log("Cheap fare is greater than Best fare")
                }
              }


              //Compares Cheap fare with Quic fare
              if(Cheap < Quick){
                expect(Cheap).to.be.lessThan(Quick)
              }
              else{
                if(Cheap == Quick){
                  expect(Cheap).to.be.equal(Quick)
                }
                else{
                  cy.log("Cheap fare is greater than Quick fare")
                }
              }
             
             }
             else{
               cy.log('I am mad')
             }
           
            })

           main_page.getBestPrice()
           .then(() => {
             
             if(qTime <= cTime && qTime <= bTime){
              cy.log('Quick time is less than or equal to Cheap and Best times')
              cy.log('Cheapest Time:',cTime)
              cy.log('Best Time:',bTime) 
              cy.log('Quickest Time:',qTime)

              // Compares qTime with cTime
              if (qTime< cTime){
                expect(qTime).to.be.lessThan(cTime)
              }
              else {
                if(qTime==cTime){
                  expect(qTime).to.be.equal(cTime)
              
                }
                else{
                  cy.log("Quick time is not less than Cheap time")
                }
              }
                 // Compares qTime with bTime
              if(qTime<bTime){
                expect(qTime).to.be.lessThan(bTime)
              }
              else{
                if(qTime == bTime){
                  expect(qTime).to.be.equal(bTime)
                }
                else
                {
                  cy.log("Quick time is not less than Best time")
                }
              }
            
             }
             else{
               cy.log('I am mad')
             }

           })


    })
    
})