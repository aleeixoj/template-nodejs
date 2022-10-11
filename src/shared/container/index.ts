import '@shared/container/providers';

import { AutoLoadRepositories } from '@shared/repositories/autoloadRepositories';

const autoloadRepositories = new AutoLoadRepositories();

autoloadRepositories.execute();
