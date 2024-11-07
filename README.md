```bash
git clone https://github.com/davizp/s3-whatsapp-notifier.git
cd s3-whatsapp-notifier
```

2. Install dependencies:
```bash
npm install
```

3. Set up GitHub Secrets:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- WHATSAPP_FROM
- WHATSAPP_TO

4. Deploy:
The project will automatically deploy when you push to the main branch.

## Local Development
```bash
npm run build    # Build the project
npm test        # Run tests
npm run lint    # Lint code
```

## Project Structure
- `src/`: Source code
- `src/test/`: Test files
- `.github/workflows/`: GitHub Actions workflows
- `template.yaml`: CloudFormation template

## Contributing
1. Create a new branch
2. Make your changes
3. Submit a pull request