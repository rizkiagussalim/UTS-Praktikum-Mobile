import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  let [namaPegawai, setNamaPegawai] = useState('');
  let [golonganPegawai, setGolonganPegawai] = useState('');
  let [jabatanPegawai, setJabatanPegawai] = useState('');
  let [nilaiKinerja, setNilaiKinerja] = useState('');

  let register_user = () => {
    console.log(namaPegawai, golonganPegawai, jabatanPegawai, nilaiKinerja);

    if (!namaPegawai) {
      alert('Silahkan isi nama pegawainya!');
      return;
    }
    if (!golonganPegawai) {
      alert('Silahkan isi golongan pegawainya!');
      return;
    }
    if (!jabatanPegawai) {
      alert('Silahkan isi jabatan pegawainya!');
      return;
    }
    if (!nilaiKinerja) {
      alert('Silahkan isi nilai kinerja pegawainya!');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO tabel_pegawai (nama, golongan, jabatan, nilai_kinerja) VALUES (?,?,?,?)',
        [namaPegawai, golonganPegawai, jabatanPegawai, nilaiKinerja],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sukses',
              'Data Pegawai berhasil ditambahkan!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Kesalahan saat mencoba Mendaftarkan Pengguna !!!');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Masukkan Nama"
                onChangeText={
                  (namaPegawai) => setNamaPegawai(namaPegawai)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Masukkan Golongan"
                onChangeText={
                  (golonganPegawai) => setGolonganPegawai(golonganPegawai)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Masukkan Jabatan"
                onChangeText={
                  (jabatanPegawai) => setJabatanPegawai(jabatanPegawai)
                }
                maxLength={225}
                // numberOfLines={5}
                // multiline={true}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Masukkan Nilai Kinerja"
                onChangeText={
                  (nilaiKinerja) => setNilaiKinerja(nilaiKinerja)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mybutton title="Simpan" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;