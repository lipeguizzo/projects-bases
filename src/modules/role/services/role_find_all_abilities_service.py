from src.modules.role.models import Ability


class RoleFindAllAbilitiesService:
    @classmethod
    def execute(
        self,
    ):
        abilities = Ability.objects.all()

        return abilities
