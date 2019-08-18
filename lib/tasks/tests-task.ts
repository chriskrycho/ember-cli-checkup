import { ITask, ICheckupResult, IProject } from '../../interfaces';
import Task from '../task';
import FileSearcher from '../utils/file-searcher';

const SEARCH_PATTERNS = {
  unit: ['**/tests/unit/**/*.js'],
  acceptance: ['**/tests/acceptance/**/*.js'],
  integration: ['**/tests/integration/**/*.js'],
};

export default class TestsTask extends Task implements ITask {
  searcher: FileSearcher;

  constructor(project: IProject, result: ICheckupResult) {
    super(project, result);
    this.searcher = new FileSearcher(this.project.baseDir, SEARCH_PATTERNS);
  }

  async run() {
    let result = await this.searcher.search();

    this.result.tests = result;
  }
}
