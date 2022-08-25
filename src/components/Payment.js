import { StyleSheet, Text, TextInput, View,Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { useStripe } from '@stripe/stripe-react-native';

const Payment = () => {
    const stripe=useStripe();
    const [name,setName]=useState('');
    
    const subcribe = async () =>{
            //sending requests  
            try {
                const response=await fetch(`http://localhost:8080/pay`,
                    {
                    method:"POST",
                    body:JSON.stringify({name}),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                
                const data=await response.json();
                if(!response.ok) return Alert.alert(data.message);
                const clientSecret=data.clientSecrets;
                const initSheet=await stripe.initPaymentSheet({
                    paymentIntentClientSecret:clientSecret
                })
                if(initSheet.error) return Alert.alert(initSheet.error.message);
                const presentSheet=await stripe.presentPaymentSheet({
                    
                    clientSecret
                })
                if(presentSheet.error) return Alert.alert(presentSheet.error.message);
                Alert.alert('Payment Completed : Thank You' )
            } catch (error) {
                console.error(error)
                Alert.alert('Something went Wrong!!!')
            }
    
    }
    return (
    <View>
      <TextInput value={name} placeholder="Name" onChangeText={(text)=>setName(text)} 
        style={{fontSize:15,width:300,padding:10,borderWidth:1}}
      />
   
      <Button title='Pay Now 25 INR' onPress={subcribe}/>
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({})