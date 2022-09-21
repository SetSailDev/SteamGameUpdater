console.log("Starting...")
const fs=require("fs")
const axios=require("axios")
const childProcess = require("child_process");
const config=JSON.parse(fs.readFileSync("settings.json"))
//Initialize Loop
checkVersion()


//Insert Custom Code to be executed when an update is available within this function
function CustomFunction(){
    //Insert Custom Function here
}


//Looped Function that Checks Version
async function checkVersion(){
    setTimeout(async function(){
        console.log("Checking Version")
        var store=JSON.parse(fs.readFileSync("store.json"))
        //Request Game Info From SteamCMD.Net
        try {
            response=await axios(`https://api.steamcmd.net/v1/info/${config.AppID}`)
        } catch (error) {
            console.log("Failed to fetch data from API.")
            console.log("----------")
            checkVersion()
            return
        }
        //Get the game build and last updated time from the response
        branchData=response.data.data[config.AppID].depots.branches[config.BranchName]
        build=branchData.buildid
        lastUpdated=branchData.timeupdated
        //Get Readable Info and print it to the console
        console.log(`Last Build: ${store.build}`)
        lastUpdatedDate=(new Date(store.updated*1000)).toLocaleString()
        console.log(`Last Update Time: ${lastUpdatedDate}`)
        console.log(`Current Build: ${build}`)
        currentUpdateDate=(new Date(lastUpdated*1000)).toLocaleString()
        console.log(`Current Update Time: ${currentUpdateDate}`)
        //Check if the build is different
        isUpdate=false
        if(build!=store.build){
            //Update is available!
            isUpdate=true
            console.log("Update Available! [Executing Script]")
            //Execute Batch Script
            childProcess.execSync(`GameUpdated.bat`)
            //Saving New Info
            store.build=build
            store.updated=lastUpdated
            fs.writeFileSync("store.json",JSON.stringify(store))
            //Run Custom Function
            CustomFunction()
        }
        console.log("----------")
        checkVersion()
    }, config["How Often To Check In Seconds"]*1000)//How Often to Check Version
}
