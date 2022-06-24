import Vue from 'vue'
import { Button } from 'element-ui'
import { Form, FormItem, Input } from 'element-ui'
import { Container, Header, Aside, Main } from 'element-ui'
import { Timeline, Upload, Checkbox, CheckboxGroup, Cascader, TabPane, Tabs, Step, Steps, Alert, MessageBox, Message, Popconfirm, Tree, Tag, Option, Select, Dialog, Switch, Pagination, TableColumn, Table, Card, BreadcrumbItem, Breadcrumb, Row, Col, Menu, Submenu, MenuItemGroup, MenuItem, timeline, TimelineItem } from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Popconfirm)
Vue.use(Alert)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Cascader)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(TimelineItem)


Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
