import { ModuleData } from '../../types';
import { bkModules } from './bk';
import { tikModules } from './tik';
import { skModules } from './sk';
import { jkiModules } from './jki';
import { adModules } from './ad';
import { apModules } from './ap';
import { dsiModules } from './dsi';
import { plbModules } from './plb';

export {
  bkModules,
  tikModules,
  skModules,
  jkiModules,
  adModules,
  apModules,
  dsiModules,
  plbModules
};

export const allModulesData: ModuleData[] = [
  ...bkModules,
  ...tikModules,
  ...skModules,
  ...jkiModules,
  ...adModules,
  ...apModules,
  ...dsiModules,
  ...plbModules
];
