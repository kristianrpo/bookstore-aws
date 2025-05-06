from abc import ABC, abstractmethod

class AuthenticationServiceInterface(ABC):
    @abstractmethod
    def register(self, name: str, email: str, password: str):
        """Register a new user with the given name, email, and password."""
        pass

    @abstractmethod
    def login(self, email: str, password: str):
        """Authenticate a user with the given email and password."""
        pass

    @abstractmethod
    def logout(self):
        """Log out the currently authenticated user."""
        pass
