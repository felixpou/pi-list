#include "ebu/list/net/ethernet/decoder.h"
#include "ebu/list/net/ethernet/header.h"
#include "ebu/list/core/memory/bimo.h"
#include <sstream>
#include <iomanip>

using namespace ebu_list::ethernet;
using namespace ebu_list;

//------------------------------------------------------------------------------

std::tuple<header, oview> ethernet::decode(oview&& l2_packet)
{
    using ethernet_header_slice = mapped_oview<ethernet::l2_header>;
    auto[ethernet_header, ethernet_payload] = split(std::move(l2_packet), sizeof(ethernet::l2_header));
    ethernet_header_slice s(std::move(ethernet_header));
    header h{ s.value().destination_address, s.value().source_address, static_cast<payload_type>(to_native(s.value().type)) };
    return { h, ethernet_payload };
}

std::ostream& ethernet::operator<<(std::ostream& os, const header& h)
{
    os << "Ethernet - destination: " << ethernet::to_string(h.destination_address)
        << ", source: " << ethernet::to_string(h.source_address)
        << ", type: 0x" << std::hex << std::setfill('0') << std::setw(4) << (h.type);

    return os;
}

std::ostream& ethernet::operator<<(std::ostream& os, payload_type h)
{
    os << std::hex << std::setfill('0') << std::setw(4) << static_cast<int>(h);
    return os;
}
