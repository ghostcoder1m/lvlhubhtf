# LVLHUB AI Content Engine

A Next.js application for AI-powered content generation and management.

## Features

- Content Pipeline Management
- Lead Generation
- AI Agents
- Performance Analytics
- Real-time Chat Interface
- Multi-role Support (Admin, Editor, Viewer)

## Docker Setup

### Prerequisites

- Docker
- Docker Compose

### Development

To run the application in development mode:

```bash
docker compose up dev
```

The application will be available at http://localhost:3000 with hot-reload enabled.

### Production

To run the application in production mode:

```bash
docker compose up prod
```

The application will be available at http://localhost:3000.

### Building the Image

To build the Docker image:

```bash
docker build -t lvlhub .
```

## Local Development Setup

If you prefer to run the application without Docker:

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Start production server:
```bash
npm start
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Add your environment variables here
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
