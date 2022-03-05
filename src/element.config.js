import {
  Pagination,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Select,
  Option,
  Button,
  Popover,
  Tooltip,
  Alert,
  Icon,
  Upload,
  Collapse,
  CollapseItem,
  Message,
  Alert
} from 'element-ui'

const ElementConfig = {
  install(app) {
    app.use(Pagination)
    app.use(Dropdown)
    app.use(DropdownMenu)
    app.use(DropdownItem)
    app.use(Menu)
    app.use(Submenu)
    app.use(MenuItem)
    app.use(Input)
    app.use(Select)
    app.use(Option)
    app.use(Button)
    app.use(Popover)
    app.use(Tooltip)
    app.use(Alert)
    app.use(Icon)
    app.use(Upload)
    app.use(Collapse)
    app.use(CollapseItem)
    app.use(Alert)
    app.prototype.$message = Message
  }
}

export default ElementConfig
