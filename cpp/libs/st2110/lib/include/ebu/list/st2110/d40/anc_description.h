#pragma once

#include "ebu/list/core/media/video_description.h"
#include "ebu/list/core/media/anc_description.h"
#include "ebu/list/sdp/media_description.h"
#include "ebu/list/st2110/d10/network.h"
#include "ebu/list/st2110/d40/packet.h"

namespace ebu_list::st2110::d40
{
    namespace video = ebu_list::media::video;
    namespace anc = ebu_list::media::anc;

    class anc_stream
    {
        public:
            anc_stream(uint16_t did_sdid, uint8_t num);
            anc::did_sdid did_sdid() const;
            uint8_t num() const;
            uint16_t errors() const;
            void errors(uint16_t err);
            std::string type() const;
            bool operator==(const anc_stream& other);
            bool is_valid() const;

        private:
            void check();
            anc::did_sdid did_sdid_;
            uint8_t num_;
            uint16_t errors_;
            // add payload_
    };

    struct anc_description : d10::stream_information
    {
        video::Rate rate = video::Rate(0,1);
        int packets_per_frame = 0;
        std::vector<anc_stream> streams;
    };

    struct st2110_40_sdp_serializer
    {
        explicit st2110_40_sdp_serializer(const anc_description& anc_des);
        void write_rtpmap_line(std::vector<std::string>& current_lines, const ebu_list::media::network_media_description& media_description);
        void additional_attributes(std::vector<std::string>& current_lines, const media::network_media_description& media_description);

    private:
        const anc_description& anc_desc_;
    };
}
