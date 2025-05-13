from abc import ABC, abstractmethod

class UserRepositoryInterface(ABC):
    @abstractmethod
    def create(self, name: str, email, password: str):
        """Create a new user with the given name, email, and password."""
        pass

    @abstractmethod
    def get_by_email(self, email: int):
        """Retrieve a user by their email address."""
        pass

    
    @abstractmethod
    def get_all(self):
        """Return all users"""
        pass
