# Steam Game Updater
This is a quick to setup and easily configurable script to automatically keep your Steam Games/Servers up to date.

## Settings:
- "How Often To Check In Seconds" (How Often the bot will check in seconds) [Default: 30]
- "AppID" (The ID of the app/game/server you would like to check for updates on) [Default: "1247090" {Stormworks: Build and Rescue}]
- "BranchName" (The name of the branch you would like to check for updates on, usually named "public") [Default: "Public"]

## Setup:
- Enter your update script into GameUpdated.bat.
- Optionally enter a custon JS script within the function named "CustomFunction" in main.js.
- Lastly configure all the neccesary settings within settings.json, a settings list is seen above.
- You can run the script with RunScript.bat.
