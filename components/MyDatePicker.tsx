
import {View, Text, Pressable, StyleSheet, GestureResponderEvent} from'react-native';
import DateTimePicker, {DateTimePickerChangeEvent} from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';

type WebDatePickerProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export function WebDatePicker({onChange}: WebDatePickerProps) {    
    return (
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', 
        padding: 4, gap: 16, borderWidth:.5, borderRadius:8, borderColor:'lightgray'}}>        
            <input 
                type="date" 
                defaultValue="2026-01-01"
                onChange={onChange}
                style={{fontSize: 14}}
            />
        </View>
    )
}

type NativeDatePickerProps = {
    isoStringDate: string,
    handleChange: (e: DateTimePickerChangeEvent , date?: Date) => void,
    handlePress: (e: GestureResponderEvent) => void,
    isShowingCalendar?: boolean
}

export function NativeDatePicker({ isoStringDate, handleChange, handlePress, isShowingCalendar }: NativeDatePickerProps) {
    return (
        <View style={styles.container}>           
            <Pressable style={styles.calendar} onPress={handlePress}  >
                <Text style={{}} >{new Date(isoStringDate).toISOString().slice(0, 10)}</Text>
                <Ionicons name='calendar' size={24} color='teal' />
            </Pressable>               
        { isShowingCalendar &&    
            <DateTimePicker 
                value={new Date(isoStringDate)}
                mode='date'
                display='default'
                onValueChange={handleChange}
            />
        }    
        </View>
    )   
}

const styles = StyleSheet.create( {
    container: {
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center', 
        paddingHorizontal: 8,
        gap: 16,
        // backgroundColor: '#4ad',
        borderRadius: 8
    },
    calendar: {
        flexDirection: 'row',
        borderRadius: 4,
        borderColor: '#aaa',
        borderWidth: 1,
        padding: 4,
        gap: 16
    },
    text: {
        backgroundColor:'#068', 
        padding: 4, 
        textAlignVertical: 'center', 
        borderRadius: 4, fontSize: 14, 
        color: '#dfdfdf'
    }
})