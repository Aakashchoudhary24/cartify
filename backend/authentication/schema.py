import strawberry
from django.contrib.auth import get_user_model
from chowkidar.decorators import login_required
from chowkidar.wrappers import issue_tokens_on_login, revoke_tokens_on_logout
from chowkidar.authentication import authenticate 

User = get_user_model()

@strawberry.type
class UserType:
    id: strawberry.ID
    username: str
    email: str

@strawberry.type
class AuthPayload:
    token: str
    user: UserType

@strawberry.type
class AuthMutation:
    @strawberry.mutation
    @issue_tokens_on_login
    def login(self, info, username : str, password : str) -> bool : 
        user = authenticate(username = username, password = password)
        if user is None:
            raise Exception("Invalid username or password")
        
        info.context.LOGIN_USER = user
        
        return True
    
    @strawberry.mutation
    @revoke_tokens_on_logout
    def logout(self, info) -> bool:
        info.context.LOGOUT_USER = True

        return True

    @strawberry.mutation
    def register(self, username: str, email: str, password: str) -> UserType:
        user = User.objects.create_user(username=username, email=email, password=password)
        return UserType(id=user.id, username=user.username, email=user.email)

    
@strawberry.type
class AuthQuery:
    @strawberry.field
    @login_required
    def me(self, info) -> UserType:
        user = info.context.user
        return UserType(id=user.id, username=user.username, email=user.email)


schema = strawberry.Schema(
    query=AuthQuery,
    mutation=AuthMutation,
    types=[UserType, AuthPayload]  
)
