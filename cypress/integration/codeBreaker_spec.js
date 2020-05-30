describe('Code Breaker Page', () => {
    it('Game', () => {

        cy.request('http://localhost:3000/iniciar?tipo=1&numero=4398').then((response) => {
            var secreto = response.body.respuesta;
            for(let i=0; i<3; i++) {
                secreto = secreto.replace(',', '');
            }
            cy.visit('/');
            //cy.pause()

            // Test no adivinó nada
            cy.get('#input-intento')
            .type('1562')
            .should('have.value', '1562');
            cy.get('#button-game').click().next()
            cy.get('#respuesta')
            .should('have.value', '')

            // Test adivinó numeros no posicion
            cy.get('#input-intento').clear()
            cy.get('#respuesta').clear()
            cy.get('#input-intento')
            .type('8723')
            .should('have.value', '8723');
            cy.get('#button-game').click().next()
            cy.get('#respuesta')
            .should('have.value', ' _ _')

            // Test adivinó numeros no posicion y uno con posicion
            cy.get('#input-intento').clear()
            cy.get('#respuesta').clear()
            cy.get('#input-intento')
            .type('4873')
            .should('have.value', '4873');
            cy.get('#button-game').click().next()
            cy.get('#respuesta')
            .should('have.value', ' x _ _')

            // Test Numero adivinado!!
            cy.get('#input-intento').clear()
            cy.get('#respuesta').clear()
            cy.get('#input-intento')
            .type('4398')
            .should('have.value', secreto);
            cy.get('#button-game').click().next()
            cy.get('#respuesta')
            .should('have.value', ' x x x x')
        })
    })
});