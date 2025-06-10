<div align="center">
  <img src="assets/banner.svg" width="1200" alt="demo"/>
</div>

## 🎬 Demo

See it in action! Here's how easy it is to create a VPC with 2 subnets and delete them using natural language:

<div align="center" style="margin-top:20px;margin-bottom:20px;">
<img src="assets/demo.gif" width="1200" alt="demo"/>
</div>

> 💡 **Pro tip**: The video shows creating a VPC with 2 subnets and deleting them through chat - no AWS console needed!

---

## ✨ Features

Currently supports

1. **RDS**:

- ✅ List all RDS DB instances in the given region
- ✅ Create a new RDS DB instance
- ✅ Delete an existing RDS DB instance
- ✅ Update an RDS DB instance

2. **S3**:

- ✅ List all S3 buckets in the given region
- ✅ Create a new S3 bucket
- ✅ Delete an existing S3 bucket

3. **VPC**:

- ✅ List all VPCs in the given region
- ✅ Create a new VPC
- ✅ Delete an existing VPC
- ✅ Update an VPC attributes
- ✅ Update an VPC endpoint

4. **Subnet**:

- ✅ List all subnets in the given VPC
- ✅ Create a new subnet
- ✅ Delete an existing subnet
- ✅ Update an subnet attributes

More AWS services (like EC2, Lambda, etc.) coming soon! Contributions welcome 🚀

---

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 10.0.0
- **AWS Account** with AWS credentials(Access Key ID and Secret Access Key)

---

## ⚙️ Developer Setup

### 1. Clone the repo

```bash
git clone https://github.com/lokeswaran-aj/aws-mcp.git
cd aws-mcp
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Then update your AWS credentials inside `.env`. Make sure you've created an IAM user with appropriate permissions.

> ❗️Currently, the server reads credentials from environment variables. In future versions, we'll support secure credential injection or AWS SSO.

### 3. Install dependencies

```bash
pnpm install
```

> 💡 Make sure you have `pnpm` installed globally. If not:
>
> ```bash
> npm install -g pnpm
> ```

### 4. Run the dev server

```bash
pnpm dev
```

The server will start on the port specified in your `.env` file (default is `8080`).

MCP SSE endpoint:
[`http://localhost:8080/sse`](http://localhost:8080/sse)

---

## 🧪 Example: Windsurf Configuration

To use this server with [Windsurf IDE](https://windsurf.com), add the following to your `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "aws": {
      "serverUrl": "http://localhost:8080/sse"
    }
  }
}
```

---

## 📁 Project Structure

```bash
.
├── src/
│   ├── index.ts              # Entry point
│   ├── server.ts             # AWS MCP server setup
│   ├── aws-clients.ts        # AWS SDK client setup
│   ├── config/               # App configuration
│   ├── controllers/          # MCP request handlers
│   ├── routes/               # API endpoints
│   ├── tools/                # Tools definitions
│   │   └── rds/              # RDS operations (create, list, delete, update)
│   ├── schema/               # Tool input schemas
│   ├── services/             # Transport handler
│   ├── types/                # TypeScript definitions
│   └── utils/                # Helper functions
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

---

## 📌 Roadmap

- [x] Support RDS (Create, List, Update, Delete)
- [x] Add S3 tools
- [ ] Add Network tools
- [ ] Add EC2 tools
- [ ] Add Lambda tools
- [ ] Add IAM tools
- [ ] Add ECS tools

---

## 🤝 Contributing

Want to help make AWS infra chat-native?
Pull requests, feedback, and feature suggestions are welcome!

- Clone and fork the repo
- Create your feature branch (`git checkout -b feat/add-ec2`)
- Commit and push
- Open a PR 🙌

---

## 📄 License

MIT — do what you want, just give credit where it's due. ✌️

---

## ⚡ Powered by

- [Model Context Protocol](https://modelcontextprotocol.io/introduction)
- [AWS SDK for JS (v3)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
