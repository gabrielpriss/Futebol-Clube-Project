import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import MatchModel from './MatchModel';

class TeamModel extends Model {
  id!: number;
  teamName!: string;
}

TeamModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false });

MatchModel.belongsTo(TeamModel, { foreignKey: 'id', as: 'teams_home_team' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'id', as: 'teams_away_team' });

TeamModel.hasMany(MatchModel, { foreignKey: 'home_team', as: 'matches_home_team' });
TeamModel.hasMany(MatchModel, { foreignKey: 'away_team', as: 'matches_away_team' });

export default TeamModel;
