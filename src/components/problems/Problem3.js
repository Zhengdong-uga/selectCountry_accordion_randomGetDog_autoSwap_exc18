import { Tabs } from 'antd';
import seasons from '../util/seasons'

// Install ant design: https://ant.design/docs/react/introduce
// Add tabs: https://ant.design/components/tabs/
// We will be making tabs for seasons, similar to a prior assignment.
const Problem3 = () => {
  return <Tabs items={seasons} />
}

export default Problem3;
