# myapp/utils.py

import json
from api.views import get_user_results  # Assuming your helper function is in views.py
from api.models import User

class UserResults:
    @staticmethod
    def fetch_all_user_data():
        """Fetch progress data for all users."""
        all_users_data = {}

        all_users = User.objects.all()
        for user in all_users:
            user_data = get_user_results(user)  # Use the helper function
            all_users_data[user.username] = user_data

        return all_users_data

    @staticmethod
    def print_as_json():
        """Fetch and print all user data in JSON format."""
        all_users_data = UserResults.fetch_all_user_data()
        print(json.dumps(all_users_data, indent=4))
