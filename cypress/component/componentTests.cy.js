import App from '../../src/App';
import Problem1 from '../../src/components/problems/Problem1'
import Problem2 from '../../src/components/problems/Problem2';
import Problem3 from '../../src/components/problems/Problem3';
import Problem4 from '../../src/components/problems/Problem4';
import countries from '../../src/components/util/countries'
import seasons from '../../src/components/util/seasons'
import Problem5 from '../../src/components/problems/Problem5';
import Problem6 from '../../src/components/problems/Problem6';
describe('component tests', () => {
  describe("problem 1",()=>{
    beforeEach(()=>{
      cy.mount(<Problem1 />)
      cy.get('button.btn-primary').as('modalBtn')
    })

    it('lib test', () => {
      let button,modal
      try {
        button = require('react-bootstrap/Button')
        modal = require('react-bootstrap/Modal')
      } finally {
        expect(button != undefined).to.equal(true, 'should import related library')
        expect(modal != undefined).to.equal(true, 'should import related library')
      }
    })
    it('Show the modal by clicking the button',()=>{
      cy.get('body > div.fade.modal.show').should(e=>{
        expect(e.length).to.equal(0,'expect there is no modal before clicking the button')
      })
      cy.get('@modalBtn').click()
        .then(()=>{
          cy.get('body > div.fade.modal.show').should(e=>{
            expect(e.length).to.equal(1,'expect to display the modal after clicking the button')
          })
        })
    })

    it('should have the correct modal structure',()=>{
      cy.get('@modalBtn').click()
        .then(()=>{
          cy.get('body > div.fade.modal.show > div').should(e=>{
            expect(e.attr('class')).to.equal('modal-dialog','expect to have a class name called modal-dialog')
          })
          cy.get('body > div.fade.modal.show > div > div').should(e=>{
            expect(e.attr('class')).to.equal('modal-content','expect to have a class name called modal-content')
            expect(e.children().length).to.equal(3)
            expect(e.children().eq(0).attr('class')).to.equal('modal-header','expect to have a class name called modal-header')
            expect(e.children().eq(1).attr('class')).to.equal('modal-body','expect to have a class name called modal-body')
            expect(e.children().eq(2).attr('class')).to.equal('modal-footer','expect to have a class name called modal-footer')
          })
          cy.get('body > div.fade.modal.show > div > div > div.modal-header').should(e=>{
            expect(e.children().length).to.equal(2)
            expect(e.find('div').attr('class')).to.equal('modal-title h4')
            expect(e.find('button').attr('class')).to.equal('btn-close')
          })
          cy.get('body > div.fade.modal.show > div > div > div.modal-footer').should(e=>{
            expect(e.children().length).to.equal(2)
            expect(e.find('button').eq(0).attr('class')).contain('btn-secondary')
            expect(e.find('button').eq(1).attr('class')).contain('btn-primary')
          })
        })

    })

    it('should close modal with footer secondary button',()=>{
      cy.get('@modalBtn').click()
        .then(()=>{
          cy.get('body > div.fade.modal.show > div > div > div.modal-footer > button.btn.btn-secondary').click()
        })
        .then(()=>{
          cy.get('body > div.fade.modal.show').should(e=>{
            expect(e.length).to.equal(0,'expect there is no modal after clicking the secondary button')
          })
        })
    })

    it('should close modal with footer primary button',()=>{
      cy.get('@modalBtn').click()
        .then(()=>{
          cy.get('body > div.fade.modal.show > div > div > div.modal-footer > button.btn.btn-primary').click()
        })
        .then(()=>{
          cy.get('body > div.fade.modal.show').should(e=>{
            expect(e.length).to.equal(0,'expect there is no modal after clicking the primary button')
          })
        })
    })

    it('should close modal with close button',()=>{
      cy.get('@modalBtn').click()
        .then(()=>{
          cy.get('body > div.fade.modal.show > div > div > div.modal-header > button').click()
        })
        .then(()=>{
          cy.get('body > div.fade.modal.show').should(e=>{
            expect(e.length).to.equal(0,'expect there is no modal after clicking the close button')
          })
        })
    })
  })

  describe('problem 2',()=>{
    beforeEach(()=>{
      cy.mount(<Problem2 />)
    })
    it('lib test', () => {
      let textfiled, autocomplete
      try {
        textfiled = require('@mui/material/TextField')
        autocomplete = require('@mui/material/Autocomplete')
      } finally {
        expect(textfiled != undefined).to.equal(true, 'should import related library')
        expect(autocomplete != undefined).to.equal(true, 'should import related library')
      }
    })
    it('default status',()=>{
      cy.get('label').should(e=>{
        expect(e.text()).to.equal('Country','expect to have a default label Country')
        expect(e.attr('data-shrink')).to.equal('false')
      })
      cy.get('input').should(e=>{
        expect(e.attr('aria-expanded')).to.equal('false')
      })
      cy.get('div > div > div > div > button').should(e=>{
        expect(e.attr('aria-label')).to.equal('Open')
      })
      cy.get('body > .MuiAutocomplete-popper.MuiPopper-root').should(e=>{
        expect(e.length).to.equal(0,'should not exist the list in the default status')
      })
    })
    it('click the input box',()=>{
      cy.get('input').click()
        .then(()=>{
          cy.get('label').should(e=>{
            expect(e.attr('data-shrink')).to.equal('true')
          })
          cy.get('input').should(e=>{
            expect(e.attr('aria-expanded')).to.equal('true')
          })
          cy.get('div > div > div > div > button').should(e=>{
            expect(e.attr('aria-label')).to.equal('Close')
          })
          cy.get('.MuiAutocomplete-popper.MuiPopper-root').should(e=>{
            expect(e.length).to.equal(1,'should display the list after clicking the button')
          })
        })
    })
    it('list structure',()=>{
      cy.get('input').click()
        .then(()=>{
          cy.get('ul').should(e=>{
            expect(e.children().length).to.equal(countries.length)
            const testarr=[2,31,86,125,204]
            testarr.forEach((num)=>{
              expect(e.children().eq(num).text()).to.equal(countries[num].name)
            })
          })
        })
    })
    it('click the list item',()=>{
      const testarr=[2,31,86,125,204]
      testarr.forEach((num)=>{
        cy.get('input').click()
          .then(()=>{
            let text
            cy.get('ul>li').eq(num).should(e=>{
              text=e.text()
            })
            cy.get('ul>li').eq(num).click()
              .then(()=>{
                cy.get('input').should(e=>{
                  expect(e.attr('value')).to.equal(text)
                })
              })
          })
      })
    })
    it('input and search for countries',()=>{
      const testarr=[2,31,86,125,204]
      testarr.forEach((num)=>{
        cy.get('input').type(countries[num].name)
          .then(()=>{
            cy.get('ul').should(e=>{
              expect(e.length).to.equal(1)
              expect(e.children().text()).to.equal(countries[num].name)
            })
            cy.get('input').clear()
          })
      })
    })
    it('close the list',()=>{
      cy.get('input').click()
        .then(()=>{
          cy.get('body').click('bottomRight')
        })
        .then(()=>{
          cy.get('label').should(e=>{
            expect(e.attr('data-shrink')).to.equal('false')
          })
          cy.get('input').should(e=>{
            expect(e.attr('aria-expanded')).to.equal('false')
          })
          cy.get('div > div > div > div > button').should(e=>{
            expect(e.attr('aria-label')).to.equal('Open')
          })
          cy.get('.MuiAutocomplete-popper.MuiPopperUnstyled-root').should(e=>{
            expect(e.length).to.equal(0,'should not exist the list in the default status')
          })
        })
    })
  })

  describe('problem 3',()=>{
    beforeEach(()=>{
      cy.mount(<Problem3 />)
      cy.get('div.ant-tabs-tab').as('tabs')
      cy.get('div.ant-tabs-tabpane').as('contents')
    })

    it('should have correct tabs and contents',()=>{
      cy.get('@tabs').should(e=>{
        expect(e.length).to.equal(seasons.length)
        seasons.forEach((item,index)=>{
          expect(e.eq(index).find('div').text()).to.equal(item.label)
        })
      })
    })
    it('should have correct content after clicking each tab',()=>{
      const testarr=[3,1,2]
      testarr.forEach(num=>{
        cy.get('@tabs').eq(num).should(e=>{
          expect(e.attr('class')).not.contain('ant-tabs-tab-active')
        })
        cy.get('@tabs').eq(num).click()
          .then(()=>{
            cy.get('@tabs').eq(num).should(e=>{
              expect(e.attr('class')).contain('ant-tabs-tab-active')
            })
            cy.get(`#rc-tabs-1-panel-${seasons[num].key}`).should(e=>{
              expect(e.length).to.equal(1)
              expect(e.text()).to.equal(seasons[num].children)
            })
          })
      })
    })
  })

  describe('problem 4',()=>{
    beforeEach(()=>{
      cy.mount(<Problem4 />)
    })
    it('lib test', () => {
      let accordion
      try {
        accordion = require('react-bootstrap/Accordion')
      } finally {
        expect(accordion != undefined).to.equal(true, 'should import related library')
      }
    })

    it('should have accordion div',()=>{
      cy.get('body>div>div').then((div)=>{
        expect(div.attr('class')).to.equal('accordion')
      })
    })
    it('should have correct accordion items',()=>{
      cy.get('div.accordion').children().should((output)=>{
        expect(output.length).to.equal(seasons.length,`should have ${seasons.length} accordion items`)
      })
    })
    it('should have the correct structure',()=>{
      cy.get('.accordion').children().each((element)=>{
        expect(element.find('h2').attr('class')).to.equal('accordion-header','There should be a header element')
        expect(element.find('div').attr('class')).to.include('accordion-collapse collapse','There should be a collapse')
        expect(element.find('button').attr('class')).to.include('accordion-button','There should be a button element')
        expect(element.find('div').find('div').attr('class')).to.equal('accordion-body','There should be a content div')
      })
    })
    it('should match the text',()=>{
      seasons.forEach((item,index)=>{
        cy.get('.accordion button').then((header)=>{
          expect(header.eq(index)).contain(item.label)
        })
        cy.get('.accordion-body').then((content)=>{
          expect(content.eq(index)).contain(item.children)
        })
      })
    })
    it('should have accordion effect',()=>{
      const testarr=[3,1,2]
      testarr.forEach((num,index)=>{
        cy.get('.accordion-item').eq(num).should(e=>{
          expect(e.find('button').attr('aria-expanded')).to.equal('false')
          expect(e.find('div').attr('class')).not.contain('show')
        })
        cy.get('.accordion-item').eq(num).find('button').click()
          .then(()=>{
            cy.get('.accordion-item').eq(num).should(e=>{
              expect(e.find('button').attr('aria-expanded')).to.equal('true')
              expect(e.find('div').attr('class')).contain('show')
            })
            if(index>0){
              cy.get('.accordion-item').eq(num-1).should(e=>{
                expect(e.find('button').attr('aria-expanded')).to.equal('false')
                expect(e.find('div').attr('class')).not.contain('show')
              })
            }
          })
      })
    })
  })

  describe('problem 5', () => {
    let imageUrls = [
      'https://images.dog.ceo/breeds/segugio-italian/n02090722_002.jpg',
      'https://images.dog.ceo/breeds/coonhound/n02089078_4.jpg',
      'https://images.dog.ceo/breeds/deerhound-scottish/n02092002_7268.jpg',
    ]
    let imageUrl
    beforeEach(() => {
      cy.mount(<Problem5 />)
      imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]
      cy.intercept('GET', 'https://dog.ceo/api/breeds/image/random', (req) => {
        req.reply({ body: { message: imageUrl }, delay: 1000 })
      }).as('request')
    })

    it('lib test', () => {
      let box, loadingButton
      try {
        box = require('@mui/material/Box')
        loadingButton = require('@mui/lab/LoadingButton')
      } finally {
        expect(box != undefined).to.equal(true, 'should import related library')
        expect(loadingButton != undefined).to.equal(
          true,
          'should import related library'
        )
      }
    })

    it('test image src', () => {
      cy.get('div>button')
        .click()
        .then(() => {
          cy.wait('@request').then(() => {
            cy.get('div>img').should((img) => {
              expect(img.attr('src')).to.equal(imageUrl, 'right image url')
            })
          })
        })
    })
    it('test loading before fetching',()=>{
      cy.get('div>button').click()
      cy.intercept("https://dog.ceo/api/breeds/image/random", () => {
        cy.get('div>button').should('have.text','Loading...');
      });
    })
    it('remove loading after fetching',()=>{
      cy.get('div>button').click()
        .then(()=>{
          cy.wait('@request').then(()=>{
            cy.get('div>button').should('have.text','Get Dog')
          })
        })
    })
  })

  describe('problem 6',()=>{
    beforeEach(()=>{
      cy.mount(<Problem6 />)
    })
    it('should have the correct content',()=>{
      seasons.forEach((season,index)=>{
        cy.get('div.slick-track').children().eq(index+1).should(e=>{
          expect(e.find('h3').text()).to.equal(season.label)
          expect(e.find('p').text()).to.equal(season.children)
        })
      })
    })
    it('should autoplay',()=>{
      seasons.forEach((season)=>{
        cy.get('div.slick-active').should(e=>{
          expect(e.find('h3').text()).to.equal(season.label)
          expect(e.find('p').text()).to.equal(season.children)
        })
        cy.wait(3000)
      })
      cy.get('div.slick-active').should(e=>{
        expect(e.find('h3').text()).to.equal(seasons[0].label)
        expect(e.find('p').text()).to.equal(seasons[0].children)
      })
    })
  })
})
