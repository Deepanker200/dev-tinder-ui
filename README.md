# DevTinder

- Created a Vite + React application
- Remove unecessary code and create a Hello World App!
- Install Tailwind CSS
- Install Daisy UI
- Add Navbar component to App.jsx
- Create a Navbar.jsx seperate Component File
- Install react router DOM
- Create BrowserRouter/>
- Create a Footer
- Create a Login Page
- Install axios
- CORS- Install CORS in backend => add middleware to frontend with configurations: origin, credentials:truw
- Whenever making API call so pass=>{withCredentials:true} for axios
- Install react-redux + @reduxjs/toolkit
- configureStore => Provider => createSlice=> add reducer to store=> susbcribe to store
- Note: Never write hook inside a function
- Login and see if the data is coming properly in the store
- Refactor the code to add constants file + create a components folder
- You should not be access routes without login
- If token is not present, redirect user to login page
- Get the feed and add the feed in the store
- Build the user card on feed
- Edit Profile Feature
- Show Toast message on saving of profile
- See all my connections
- New Page- See all my connections
- New Page- See all my connection requests
- Feature- Accept/Reject Connection Request
- Send/Ignore the connection user card from feed

- Signup New User
- E2E Testing 

# Body
- Navbar
    Route=/ => Feed
    Route=/login => Login
    Route=/profile => Profile

# Deployment
- Signup on AWS
- Launch Instance
- chmod 400 <secret>.pem
- ssh -i cmd(to be get from AWS Steps- SSH Client)
- Install same node version on virtual machine
- Git Clone
- Frontend
    - npm install -> dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - Copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80  of your instance

- Backend
    - Updated DB PAssword
    - Allowed EC2 instance public IP on mongodb server
    - npm install pm2 -g
    - npm start npm -- start
    - pm2 logs ~ for checking logs
    - pm2 flush npm(app-name) for removing logs
    - pm2 list, pm2 stop <process-name>, pm2 delete npm
    - pm2 start npm --name "devtinder-backend" -- start
    - config nginx - sudo nano /etc/nginx/sites-available/default
    - restart nginx -sudo systemctl daemon-reload (if getting warning)
    sudo systemctl restart nginx
    - Modify the BASE_URL in frontend project to "/api"


# NGINX Config:
    Frontend= http://13.235.71.40/
    Backend= http://13.235.71.40:7777/

    location /api/ {
            proxy_pass http://127.0.0.1:7777;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

# Adding a custom Domain name

- purchased domain name from godaddy
- signup on cloudflare & add a new domain name
- change the nameservers on godaddy and point it to cloudflare
- wait for sometime till your nameservers are updated ~15 minutes
- DNS record: A devtinder.in our port given by AWS
- Enable SSL for website 

# Sending Emails via SES

- Create an IAM user
    - Give access to AmazonSESFullAccess
- Amazon SES: Create an Identity
- Verify an email address
- Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
- Access Credentials should be created in IAM under SecurityCredentials Tab
- Add the Credentials to the env file
- Write code for sesClient(use credentials here)
- Write code for Sending email address(using github docs)
- Make the email dynamic by passing more params to the run function

# Scheduling cron jobs in NodeJS
    - Installing node-cron
    - Learning about cron expressions syntax- crontab.guru
    - Schedule a job
    - date-fns library
    - Find all the unique email Id who have got connection request in previous day
    - Send Email
    - Have to create send e-mail template
    
    - Explore queue mechanism to send bulk emails- for lakhs of users
    - Amazon SES Bulk email
    - Bee-queue and Bull npm package for queue in Nodejs

# Razorpay Payment Gateway Integration
    - Sign up on Razorpay & complete KYC
    - Created a UI for premium page
    - Creating an API for backend