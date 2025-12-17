# cache-redis-config

import configparser
import os
import shutil
import json
import logging

from typing import Dict

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RedisConfigGenerator:
    def __init__(self, **kwargs):
        """
        Initialize the RedisConfigGenerator with customizable options.

        :param host: Redis host (default: 'localhost')
        :param port: Redis port (default: 6379)
        :param max_clients: Maximum number of clients (default: 1000)
        :param ttl: Time to live (in seconds) (default: 3600)
        :param env_vars: Dictionary of environment variables (default: {})
        """
        self.config = configparser.ConfigParser()
        self.config['redis'] = {
            'host': kwargs.get('host', 'localhost'),
            'port': kwargs.get('port', 6379),
            'maxclients': kwargs.get('max_clients', 1000),
            'ttl': kwargs.get('ttl', 3600)
        }
        self.env_vars = kwargs.get('env_vars', {})

    def _load_env_vars(self):
        """
        Load environment variables from the system.

        :return: Dictionary of environment variables
        """
        env_vars = {}
        for var, value in os.environ.items():
            if var.startswith('REDIS_'):
                env_vars[var.upper()] = value
        return env_vars

    def generate_config(self, filename: str) -> str:
        """
        Generate a Redis configuration file.

        :param filename: Path to the configuration file
        :return: Path to the generated configuration file
        """
        # Load environment variables
        env_vars = self._load_env_vars()
        env_vars.update(self.env_vars)

        # Update configuration with environment variables
        for key, value in env_vars.items():
            self.config.set('redis', key, value)

        # Write configuration to file
        with open(filename, 'w') as config_file:
            self.config.write(config_file)

        logger.info(f'Generated Redis configuration file: {filename}')
        return filename

    def backup_config(self, filename: str) -> None:
        """
        Create a backup of the configuration file.

        :param filename: Path to the configuration file
        """
        # Create backup directory if it doesn't exist
        backup_dir = 'config_backups'
        if not os.path.exists(backup_dir):
            os.makedirs(backup_dir)

        # Create backup file
        timestamp = int(json.dumps({'timestamp': os.times()[4]}))
        backup_filename = f'{filename}.backup.{timestamp}'
        shutil.copyfile(filename, backup_filename)

        logger.info(f'Created backup of Redis configuration file: {backup_filename}')

    def version_config(self, filename: str) -> None:
        """
        Create a version history of the configuration file.

        :param filename: Path to the configuration file
        """
        # Create version directory if it doesn't exist
        version_dir = 'config_versions'
        if not os.path.exists(version_dir):
            os.makedirs(version_dir)

        # Create version file
        timestamp = int(json.dumps({'timestamp': os.times()[4]}))
        version_filename = f'{filename}.version.{timestamp}'
        shutil.copyfile(filename, version_filename)

        logger.info(f'Created version of Redis configuration file: {version_filename}')

# Example usage
if __name__ == '__main__':
    config = RedisConfigGenerator(
        host='localhost',
        port=6379,
        max_clients=1000,
        ttl=3600
    )

    config.generate_config('redis.conf')
    config.backup_config('redis.conf')
    config.version_config('redis.conf')