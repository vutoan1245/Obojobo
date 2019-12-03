import { hydrateEl } from '../react-utils'
import PageModule from './page-module-hoc'
import LibraryReducer from '../reducers/library-reducer'
hydrateEl(PageModule, LibraryReducer, "#react-hydrate-root")
