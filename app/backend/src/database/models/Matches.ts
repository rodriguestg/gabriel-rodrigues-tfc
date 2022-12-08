import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './Teams';

class MatchesModel extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

MatchesModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: 'teams',
      },
    },
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: 'teams',
      },
    },
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

TeamModel.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'teamAway' });

MatchesModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchesModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default MatchesModel;
