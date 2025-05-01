import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { AbilityEntity } from '../../domain/entities/ability.entity';
import {
  EAbilityCode,
  EAbilityCodeTranslate,
} from '../../domain/enums/ability-code.enum';
import { EAbilityActionTranslate } from '../../domain/enums/ability-action.enum';
import { useFormContext } from 'react-hook-form';

interface Props {
  code: EAbilityCode;
  abilities: AbilityEntity[];
  onChange: (select: boolean, ...abilities: AbilityEntity[]) => void;
}

export function AbilityCard({ code, abilities, onChange }: Props) {
  const { watch } = useFormContext();

  const selectedAbilities: AbilityEntity[] = watch('abilities') ?? [];

  const isSelectedAll: boolean =
    selectedAbilities.filter((ability) => ability.code === code).length ===
    abilities.length;

  const isSelected = (id: number): boolean => {
    return selectedAbilities.filter((ability) => ability.id === id).length > 0;
  };

  return (
    <Card
      elevation={3}
      sx={{
        width: '250px',
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h6"
            component="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {EAbilityCodeTranslate[code]}
            <Checkbox
              color="secondary"
              checked={isSelectedAll}
              onChange={(e) => onChange(e.target.checked, ...abilities)}
            />
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <List dense>
          {abilities.map((ability) => (
            <ListItem
              key={ability.id}
              secondaryAction={
                <Checkbox
                  color="secondary"
                  checked={isSelected(ability.id)}
                  onChange={(e) => onChange(e.target.checked, ability)}
                />
              }
            >
              <ListItemText primary={EAbilityActionTranslate[ability.action]} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
