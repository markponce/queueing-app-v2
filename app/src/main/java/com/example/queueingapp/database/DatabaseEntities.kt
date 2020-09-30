package com.example.queueingapp.database


import androidx.room.Entity
import androidx.room.PrimaryKey
import com.example.queueingapp.domain.QueueService


@Entity(tableName = "services")
data class DbQueueService(
    @PrimaryKey
    val id: String,
    val name: String,
    val description: String,
)

fun List<DbQueueService>.asDomainModel(): List<QueueService> {
    return map {
        QueueService(
            id = it.id,
            name = it.name,
            description = it.description
        )
    }
}
