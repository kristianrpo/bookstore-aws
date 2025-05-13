from abc import ABC, abstractmethod

class UserServiceInterface(ABC):
    @abstractmethod
    def get_all_users(self):
        pass
