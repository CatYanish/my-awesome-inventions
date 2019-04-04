This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run locally

Clone the repo, then `npm install` the dependencies



`$ npm install -g @aws-amplify/cli`

or

`$ yarn global add @aws-amplify/cli`



Then 

`$ amplify configure<br>

Follow these steps to set up access to your AWS account:<br>

Sign in to your AWS administrator account:<br>

https://console.aws.amazon.com/<br>

Press Enter to continue<br>
Specify the AWS Region<br>
? region:  <your region of choice here><br>
Specify the username of the new IAM user:<br>
? user name:  amplify-admin<br>
Complete the user creation using the AWS console<br>
https://console.aws.amazon.com/iam/home?region=undefined#/users$new?step=final&accessKey&userNames=amplify-admin&permissionType=policies&policies=arn:aws:iam::aws:policy%2FAdministratorAccess<br>
Press Enter to continue<br>
Enter the access key of the newly created user:<br>
? accessKeyId:  AKIAIIxxxx**********<br>
? secretAccessKey:  rVP2wfXX+b50Dfmxxxxx********************<br>
This would update/create the AWS Profile in your local machine<br>
? Profile Name:  amplify<br>
Successfully set up the new user.`<br>

then 

`
$ amplify init<br>
Note: It is recommended to run this command from the root of your app directory<br>
? do you want to use an existing env? No<br>
? Choose your default editor: Visual Studio Code<br>
? Choose the type of app that you're building javascript<br>
Please tell us about your project<br>
? What javascript framework are you using react<br>
? Source Directory Path:  src<br>
? Distribution Directory Path: build<br>
? Build Command:  npm run-script build<br>
? Start Command: npm run-script start<br>
Using default provider awscloudformation<br>
For more information on AWS Profiles, see:<br>
https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html
? Do you want to use an AWS profile? Yes<br>
? Please choose the profile you want to use amplify<br>
⠦ Initializing project in the cloud...<br>
`





In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

