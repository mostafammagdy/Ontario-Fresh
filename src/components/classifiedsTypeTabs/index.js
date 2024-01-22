import React from 'react'

import {Tabs, Tab} from 'material-ui/Tabs'

import ClassifiedItem from '../../components/classifiedItem'

import styles from './styles.module.scss'

class ClassifiedsTypeTabs extends React.Component {
  render() {
    return (
      <Tabs
        inkBarStyle={{ backgroundColor: '#00703C', height: 5 }}
        tabItemContainerStyle={{ backgroundColor: 'none' }}
      >
        <Tab buttonStyle={{ color: '#424242' }} label="Looking For" >
          <div className={styles.tabContents}>
            <ClassifiedItem />
            <ClassifiedItem />
            <h5 style={{ textAlign: 'center' }}>See More Classifieds</h5>
          </div>
        </Tab>
        <Tab buttonStyle={{ color: '#424242' }} label="Selling" >
          <div className={styles.tabContents}>
            <ClassifiedItem />
            <ClassifiedItem />
            <h5 style={{ textAlign: 'center' }}>See More Classifieds</h5>
          </div>
        </Tab>
      </Tabs>
    )
  }
}

export default ClassifiedsTypeTabs
