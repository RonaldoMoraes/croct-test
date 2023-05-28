<h1 align="center">
    Croct
</h1>

<h4 align="center"> 
	Test 🗡️ Done!
</h4>
<p align="center">	
	
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/RonaldoMoraes/croct-test">
    
  
  <a href="https://github.com/RonaldoMoraes/croct-test/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/RonaldoMoraes/croct-test">
  </a>

  <a>

</p>

## 💻 Application

Requirements: 
- [x] Standalone application
- [x] Data input format
- [x] Data output format
- [x] Time window for timestamps of 30min
- [x] Translation from Sqlite3
- [x] Translation from [IPStack](https://ipstack.com/)
- [x] Input stream reading from csv & configurable by .env options
- [x] Input stream reading from jsonl & configurable by .env options
- [x] Output stream writing in csv & configurable by .env options
- [x] Output stream writing in jsonl & configurable by .env options
- [x] Properly tested

Bonus (that's on me bro): 
- [x] Redis for 
- [x] Repository Pattern (for Redis usage)
- [x] Factory Design Pattern for custom configuration of input, translator and outputs
- [x] Service Layer
- [x] Unitary Tests
  - 48.14% Statements 78/162
  - 31.03% Branches 18/58
  - 52.27% Functions 23/44
  - 48.4% Lines 76/157

## :rocket: Tech stack

This test was develop using the following stack:

- NodeJS 14.16.0
- NPM 6.14.11
- Docker 23.0.5
- Docker Compose v2.17.3
- Redis ([latest](https://hub.docker.com/_/redis) - 7.2)

## :hugs: Enjoy!

### Using with docker e docker-compose

```bash
# Clone this repository
$ git clone https://github.com/RonaldoMoraes/croct-test

# Enter in the project folder
$ cd croct-test

# You can change the env vars as you want (`npm install` should do this for you)
$ cp .env.example .env

# Run docker-compose
$ docker-compose up

# Running app, go and check out the output files in ./data directory ❤️
```

### Executing tests with coverage (Jest FTW! 👑)

```bash
# Clone this repository
$ git clone https://github.com/RonaldoMoraes/croct-test

# Enter in the project folder
$ cd croct-test

# You can change the env vars as you want (`npm install` should do this for you)
$ cp .env.example .env

# Run docker-compose test file
$ docker-compose -f docker-compose-test.yml up --build

# Running tests.
# You will see the result in your terminal, 
# but you can also open the ./coverage/index.html to check out some details about the coverage.

```

### Conclusion

There are some things that could be improved, like:
- More tests to reach at least 80% coverage
- Some integration tests without too many mocking
- Organize better the main.js file
- Improve performance of some methods
- Accept input arguments when running the start command indtead of take them from .env file, but that's ok!

Hope you've enjoyed! Any doubts, just let me know!