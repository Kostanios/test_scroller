const { Builder, By, Key, until } = require('selenium-webdriver');

async function connect() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await driver.get("http://www.certifications.ru ");
    openTest( driver )
}

async function openTest ( driver ) {
    setTimeout(async ()=>{

        await driver.findElement(By.xpath('/html/body/div[1]/div[3]/div[3]/a[1]')).click()
        startTest(driver)
        
    }, 1000)
}

async function startTest ( driver ) {
    setTimeout(async ()=>{
        try{
            await (await driver.findElement(By.className('button-blue-long start-testing'))).click()
            answerMachine(driver)
        }
        catch (e) {
            console.log('error - start test');
            startTest(driver)
        }
        
    }, 1000)
    
}

async function close ( driver ) {
    const close_button = await (await driver.findElement(By.id('DOMWindowClose')))
    close_button.click()
    setTimeout(async ()=>{
        const buttons = await(await driver.findElements(By.className('ui-button-text')))
        buttons[0].click()
        openTest(driver)
    },1000);
}
///html/body/div[6]/div[1]/div[2]/div[2]/form/div[2]
async function answerMachine (driver) {
    setTimeout(async ()=> {
        try {
            let elements
            elements = await (await driver.findElements(By.className('question')));
            let success
            try{
                success = await (await driver.findElement(By.className('success')));
            }
            catch (e) {

            }
            if( elements.length ){
                const firstClick = parseInt( Math.random() * 4 );
                const secondClick = parseInt( Math.random() * 4 );
                const thirdClick = parseInt( Math.random() * 4 );
                await elements[firstClick].click();
                await elements[secondClick].click();
                await elements[thirdClick].click();
                await (await driver.findElement(By.className('send-answer button-blue-small'))).click()
                answerMachine(driver)
                return
            }
            // button-blue-small testing-exit
            else if (success) {
                
                success = await (await driver.findElement(By.className('success')));
                const size = await (await success.getRect())
                console.log(`${size.width}/400`)
                  if (size.width < 120){
                    close(driver)
                    return
                }
                return
            }
            else {
                close(driver)
                return
            }
        }
        catch ( error ) {
            answerMachine(driver)
        }
    }, 100)
}

connect()
 