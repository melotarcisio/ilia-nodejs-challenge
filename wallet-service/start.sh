npm i
npm run build
npm run migrate
npm run generate

# Generate a JWT token
node -e "console.log('JWT Token to use the service: ', require('./dist/core/auth').generateJWT('external'))"

npm run start