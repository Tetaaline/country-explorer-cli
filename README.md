
#  Country Explorer CLI

Country Explorer CLI is a Node.js command-line application that allows users to explore countries around the world using the REST Countries API.

Users can search for countries, view detailed country information, and manage a personal list of favourite countries directly from their terminal.

## 1. Project Objectives

The objectives of this project are to:

- Build a functional command-line application using Node.js.
- Retrieve country information from an external REST API.
- Practise asynchronous JavaScript using `async/await` and `fetch()`.
- Store and manage data using JSON files.
- Implement command-line arguments and options.
- Handle errors and provide useful terminal feedback.
- Package the application so users can install and run it.

## 2. Features

| Feature | Description |
|---|---|
| Country Search | Search for countries by name. |
| Country Information | View capital, population, region, currency, languages and flag. |
| Add Favourites | Save countries to a personal favourites list. |
| View Favourites | Display previously saved countries. |
| Remove Favourites | Remove countries from the favourites list. |
| Help | Display available commands and instructions. |

## 3. Technologies

- **Node.js** – JavaScript runtime.
- **JavaScript ES Modules** – Organize application code.
- **REST Countries API v5** – Retrieve country information.
- **Fetch API** – Make HTTP requests.
- **Commander** – Define and manage CLI commands.
- **Chalk** – Add colours to terminal output.
- **cli-table3** – Display information in formatted tables.
- **dotenv** – Load environment variables.
- **File System (fs)** – Read and write JSON files.
- **Git and GitHub** – Version control and collaboration.

## 4. Project Structure

```text
country-explorer-cli/
│
├── src/
│   ├── cli.js
│   ├── commands/
│   │   └── countries.js
│   ├── services/
│   │   └── countryApi.js
│   ├── storage/
│   │   └── favorites.js
│   └── utils/
│       └── display.js
│
├── data/
│   └── favorites.json
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 5. Installation and Setup

### Prerequisites

- Node.js installed.
- npm installed.
- Git installed.
- A REST Countries API key.

### Step 1: Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd country-explorer-cli
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure the API key

Copy `.env.example` and rename the copy to `.env`.

```bash
cp .env.example .env
```

Open `.env` and add your API key:

```env
REST_COUNTRIES_API_KEY=YOUR_API_KEY_HERE
```

**Important:** Never commit or upload your `.env` file or actual API key to GitHub.

### Step 4: Run the application

During development:

```bash
npm start
```

After configuring the CLI package:

```bash
npm link
```

The application can then be accessed using the `country-explorer` terminal command.

## 6. Command Examples

The following are the planned commands:

```bash
# Display available commands
country-explorer --help

# Search for a country
country-explorer search Rwanda

# View country information
country-explorer info Rwanda

# Add a country to favourites
country-explorer favorites add Rwanda

# Display favourite countries
country-explorer favorites list

# Remove a country from favourites
country-explorer favorites remove Rwanda
```


**Developed by:** Teta and Nadine  
**Project:** Week 6 – Node.js CLI Tool Building Challenge
