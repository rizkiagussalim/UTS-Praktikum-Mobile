import * as SQLite from 'expo-sqlite';

// Menghubungkan ke Database Sqlite 
export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("dbPegawai.db"),
};