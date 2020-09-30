package com.example.queueingapp.database

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.room.*

@Dao
interface  QServiceDao {


    @Query("select * from services")
    fun getServices(): LiveData<List<DbQueueService>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(services : List<DbQueueService>)
}

@Database(entities = [DbQueueService::class], version = 1)
abstract  class QueueingDb: RoomDatabase() {
    abstract  val qServiceDao: QServiceDao
}

private lateinit var INSTANCE: QueueingDb


fun getDatabase(context: Context): QueueingDb {
    synchronized(QueueingDb::class.java) {
        if (!::INSTANCE.isInitialized) {
            INSTANCE = Room.databaseBuilder(context.applicationContext,
                QueueingDb::class.java,
                "queueing_app").build()
        }
    }
    return INSTANCE
}
