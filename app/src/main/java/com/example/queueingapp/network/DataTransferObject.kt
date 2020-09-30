package com.example.queueingapp.network

import android.os.Parcelable
import com.example.queueingapp.database.DbQueueService
import com.example.queueingapp.domain.QueueService
import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.android.parcel.Parcelize


//@JsonClass(generateAdapter = true)
//data class NetworkQueueingServiceContainer(val services: List<NetworkQueueingService>)

@JsonClass(generateAdapter = true)
data class NetworkQueueingService(
    @Json(name="_id") val id: String,
    val name: String,
    val description: String
)

fun List<NetworkQueueingService>.asDomainModel(): List<QueueService> {
    return map{
        QueueService(
            id = it.id,
            name = it.name,
            description = it.description
        )
    }
}

fun List<NetworkQueueingService>.asDBModel(): List<DbQueueService> {
    return map{
        DbQueueService(
            id = it.id,
            name = it.name,
            description = it.description
        )
    }
}


@JsonClass(generateAdapter = true)
data class PostDataQueue(
    val customerName: String,
    val customerType: Int,
    val services: List<QueueService>
)

@JsonClass(generateAdapter = true)
data class NetworkQueueResponseContainer(
    val queue: NetworkQueueResponse
)

@JsonClass(generateAdapter = true)
@Parcelize
data class NetworkQueueResponse(
    val customerName: String,
    val isPriority: Boolean,
    val customerType: Int,
    val ordinal : Int
) : Parcelable {
    val ordinalFormatted: String
        get() {
            val num = ordinal.toString().padStart(4, '0')
            val isPriorityString = if (isPriority) "P" else ""
            return isPriorityString.plus(num)
        }
}






//fun NetworkQueueingService.asDomainModel(): QueueService

//fun NetworkQueueingServiceContainer.asDomainModel() : List<QueueService> {
//    return services.map {
//        QueueService(
//            id = it.id,
//            name = it.name,
//            description = it.description
//        )
//    }
//}
