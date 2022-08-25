import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StripeProvider } from '@stripe/stripe-react-native'
import Payment from './src/components/Payment'

const App = () => {
  return (
    
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51LZwwrLDmLhGYEG6OM7PtLiRV40OPEsIbher7bTXCMBcSCCVAQm4RTeLnNlSmBIPo6BrvZ0Brb1N4E6XAhAo5JGx003erIDryY" >
        <Payment/>
      </StripeProvider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})