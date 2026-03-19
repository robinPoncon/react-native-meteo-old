import { TextInput } from 'react-native';
import { s } from './Searchbar.style';

type SearchbarProps = {
    onSubmit: (city: string) => void;
};

const Searchbar = ({ onSubmit }: SearchbarProps) => {
    return (
        <TextInput
            onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
            style={s.input}
            placeholder="Chercher une ville... Ex:Paris"></TextInput>
    );
};

export default Searchbar;
