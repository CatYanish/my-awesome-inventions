This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run locally

Clone the repo, then `npm install` the dependencies



`$ npm install -g @aws-amplify/cli`

or

`$ yarn global add @aws-amplify/cli`



Then 

```
$ amplify configure
Follow these steps to set up access to your AWS account:
Sign in to your AWS administrator account:
https://console.aws.amazon.com/
Press Enter to continue
Specify the AWS Region
? region:  <your region of choice here>
Specify the username of the new IAM user:
? user name:  amplify-admin
Complete the user creation using the AWS console
https://console.aws.amazon.com/iam/home?region=undefined#/users$new?step=final&accessKey&userNames=amplify-admin&permissionType=policies&policies=arn:aws:iam::aws:policy%2FAdministratorAccess
Press Enter to continue
Enter the access key of the newly created user:
? accessKeyId:  AKIAIIxxxx**********
? secretAccessKey:  rVP2wfXX+b50Dfmxxxxx********************
This would update/create the AWS Profile in your local machine
? Profile Name:  amplify-admin
Successfully set up the new user.
```


Then

```
`
$ amplify init
Note: It is recommended to run this command from the root of your app directory
? do you want to use an existing env? No
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider awscloudformation
For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use amplify
⠦ Initializing project in the cloud...
```


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

