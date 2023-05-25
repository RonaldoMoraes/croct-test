function filterData(data) {
    return {
        id: data.id ?? null,
        timestamp: data.timestamp ?? null,
        ip: data.ip ?? null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        country: data.country ?? null,
        region: data.region ?? null,
        city: data.city ?? null,
    };
}

module.exports = filterData;
