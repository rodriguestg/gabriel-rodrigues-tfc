import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class TeamModel extends Model {
  // declare <campo>: <tipo>;
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
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default TeamModel;
