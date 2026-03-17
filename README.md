# cache-redis-config

## Description
A Python package for generating Redis configuration files at runtime, providing a convenient way to manage and optimize Redis instance settings.

## Overview
`cache-redis-config` is a Python library designed to handle Redis configuration file generation and management. It simplifies the process of creating and optimizing Redis configuration files, reducing the need for manual editing and potential errors.

## Features

### Key Features

* **Automatic Configuration Generation**: Automatically generate Redis configuration files with customizable options.
* **Flexible Configuration Options**: Easily customize Redis settings, including but not limited to, port, host, max clients, and TTL.
* **Environment Variable Support**: Utilize environment variables to store sensitive configuration details.
* **File Backup and Versioning**: Create backups of generated configuration files and maintain version history.

## Technologies Used
* **Python 3.7+**: Ensures compatibility with the latest Python versions.
* **ConfigParser**: Used for handling configuration file generation and management.
* **Terraform**: Utilized for file backup and versioning.

## Installation
To install `cache-redis-config`, use pip:

```bash
pip install cache-redis-config
```

## Usage
### Basic Usage

```python
from cache_redis_config import RedisConfigGenerator

config = RedisConfigGenerator(
    host='localhost',
    port=6379,
    max_clients=1000,
    ttl=3600
)

config.generate_config('redis.conf')
```

### Custom Usage

```python
from cache_redis_config import RedisConfigGenerator

config = RedisConfigGenerator(
    host='{REDIS_HOST}',
    port='{REDIS_PORT}',
    max_clients='{MAX_CLIENTS}',
    ttl='{TTL}'
)

config.generate_config('redis.conf')
```

## Contributing
Contributions are welcome and encouraged. Please see the [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License
`cache-redis-config` is released under the [MIT License](LICENSE).

## Documentation
For more information on using `cache-redis-config`, please refer to the [API Documentation](docs/api.md).

## Changelog
For a detailed list of changes, please refer to the [Changelog](docs/changelog.md).